const Session = require("../models/Session");
const Resume = require("../models/Resume");
const mongoose = require("mongoose");
const { generateFirstQuestion } = require("../services/llm/questionGenerator");
const { generateAdaptiveQuestion } = require("../services/llm/adaptiveQuestionEngine");
const { evaluateAnswer } = require("../services/llm/answerEvaluator");
const { countFillerWords } = require("../services/speechAnalysis/fillerWordDetector");

const TOTAL_QUESTIONS = 9;

async function startSession(req, res, next) {
  try {
    const { resumeId, targetRole, jobRole } = req.body;
    const finalRole = targetRole || jobRole || "Software Engineer";

    let extractedText = "General background.";

    // 1. SAFE RESUME FETCHING: Check if resume exists so AI can read it
    if (resumeId && mongoose.Types.ObjectId.isValid(resumeId)) {
      try {
        const resume = await Resume.findById(resumeId);
        if (resume && resume.extractedText) {
            extractedText = resume.extractedText;
            console.log("✅ Resume text loaded successfully! AI is analyzing your background...");
        }
      } catch (e) {
         console.log("⚠️ DB error while fetching resume:", e.message);
      }
    } else {
      console.log("⚠️ No valid resumeId received from frontend. AI will ask generic role questions.");
    }

    let firstQuestionText = `Hello! Welcome to the interview for the ${finalRole} role. Could you please start by introducing yourself?`;

    // 2. GENERATE REAL AI QUESTION
    try {
      const generated = await generateFirstQuestion(extractedText, finalRole);
      if (generated && generated.question) {
        firstQuestionText = generated.question;
        console.log("✅ Real AI Question Generated based on your Resume!");
      }
    } catch (llmError) {
      console.log("⚠️ Gemini API Error:", llmError.message);
    }

    // 3. SAFE DB CREATION (This prevents the server crash that triggered offline mode)
    const sessionData = {
      targetRole: finalRole,
      conversationHistory: [],
    };
    
    // Only add IDs if they exist and are valid (Prevents MongoDB CastErrors)
    if (req.userId) sessionData.userId = req.userId;
    if (resumeId && mongoose.Types.ObjectId.isValid(resumeId)) sessionData.resumeId = resumeId;

    const session = await Session.create(sessionData);

    return res.status(201).json({
      sessionId: session._id, 
      question: firstQuestionText 
    });

  } catch (error) {
    console.error("🚨 Critical Error in startSession:", error.message);
    return res.status(200).json({
      sessionId: `mock_session_${Date.now()}`,
      question: `Welcome to the interview for the ${targetRole || 'role'}. Let's start by discussing your background. Tell me about yourself.`
    });
  }
}

async function submitAnswer(req, res, next) {
  try {
    const { sessionId, questionText, questionDifficulty, answerText, answer } = req.body;
    const finalAnswer = answerText || answer;

    if (!sessionId) {
      return res.status(200).json({
        question: "I see. Could you elaborate a bit more on your technical skills?",
        isSessionComplete: false
      });
    }

    // OFFLINE MODE BYPASS (Only runs if DB crashed in startSession)
    if (sessionId.toString().startsWith("mock_session")) {
      const targetRole = req.body.targetRole || "Software Engineer";
      console.log("⚠️ Running offline mode bypass");
      
      const backupQuestions = [
        `That makes sense. Can you explain a complex problem you recently solved as a ${targetRole}?`,
        `Interesting. How do you approach debugging a critical issue in production?`,
        `Got it. What's your experience with scaling applications in a ${targetRole} environment?`,
        `I see. Can you tell me about a time you had to learn a new technology quickly?`,
        `Great. How do you ensure your work is secure and maintainable?`
      ];
      
      const randomQ = backupQuestions[Math.floor(Math.random() * backupQuestions.length)];

      return res.status(200).json({
        score: 7,
        feedback: "Solid response.",
        question: randomQ, 
        isSessionComplete: false
      });
    }

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(200).json({ 
        question: "Can you tell me more about your recent projects?",
        isSessionComplete: false
      });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(200).json({ 
        question: "Interesting. Can you tell me about a time you optimized your work?",
        isSessionComplete: false
      });
    }

    let extractedText = "General background.";
    if (session.resumeId && mongoose.Types.ObjectId.isValid(session.resumeId)) {
      const resume = await Resume.findById(session.resumeId);
      if (resume) extractedText = resume.extractedText;
    }

    let evaluation = { score: 5, note: "Good attempt." };
    
    // GENERATE REAL ATS EVALUATION
    try {
      const evalResult = await evaluateAnswer(questionText, finalAnswer, session.targetRole);
      if (evalResult) evaluation = evalResult;
    } catch (llmError) {
      console.log("⚠️ Gemini ATS evaluation failed:", llmError.message);
    }

    const fillerWordCount = countFillerWords ? countFillerWords(finalAnswer) : 0;

    // Save full interaction history to DB for final analytics reports
    session.conversationHistory.push({
      question: questionText,
      difficulty: questionDifficulty || "medium",
      answer: finalAnswer,
      contentScore: evaluation.score,
      fillerWordCount,
    });

    const isSessionComplete = session.conversationHistory.length >= TOTAL_QUESTIONS;

    let nextQuestionText = "Thank you, we are done with the interview.";
    
    if (!isSessionComplete) {
      nextQuestionText = `That's a solid approach. What were the main technical challenges you faced?`;
      
      // GENERATE REAL ADAPTIVE AI QUESTION (MODIFIED: Sending only recent history to prevent LLM memory overload/looping)
      try {
        // --- MODIFICATION START ---
        // Instead of sending session.conversationHistory (all history), 
        // we slice the last 2 interactions so Gemini gets short-term context without looping.
        const recentHistory = session.conversationHistory.slice(-2);
        // --- MODIFICATION END ---

        const nextQ = await generateAdaptiveQuestion(
          recentHistory, // AI reads only recent context + resume
          extractedText, 
          session.targetRole
        );
        if (nextQ && nextQ.question) {
          let proposedQuestion = nextQ.question;
          
          // Anti-loop check fallback just in case Gemini repeats
          const isRepeated = session.conversationHistory.some(
            entry => entry.question.trim().toLowerCase() === proposedQuestion.trim().toLowerCase()
          );

          if (isRepeated || proposedQuestion === questionText) {
            console.log("🛑 Loop detected, injecting fresh emergency question.");
            const emergencyQuestions = [
              "Could you share your experience with version control and CI/CD pipelines?",
              "How do you stay updated with the latest technologies in your field?",
              "Can you give an example of how you optimized a slow-performing query or function?"
            ];
            nextQuestionText = emergencyQuestions[session.conversationHistory.length % emergencyQuestions.length];
          } else {
            nextQuestionText = proposedQuestion;
            console.log("✅ Adaptive AI Question generated successfully!");
          }
        }
      } catch (llmError) {
        console.log("⚠️ Gemini adaptive logic failed:", llmError.message);
      }
    } else {
      session.isComplete = true;
    }

    await session.save();

    return res.status(200).json({
      score: evaluation.score,
      feedback: evaluation.note,
      question: nextQuestionText,
      isSessionComplete,
    });

  } catch (error) {
    console.error("🚨 Critical Server Error in submitAnswer:", error.message);
    return res.status(200).json({
      score: 5,
      feedback: "System fallback triggered.",
      question: "I understand. Moving on, what do you consider to be your strongest asset?",
      isSessionComplete: false
    });
  }
}

async function endSession(req, res, next) {
  try {
    const { sessionId } = req.body;
    if(sessionId && !sessionId.toString().startsWith("mock_session") && mongoose.Types.ObjectId.isValid(sessionId)) {
        const session = await Session.findById(sessionId);
        if (session) {
          session.isComplete = true;
          await session.save();
        }
    }
    return res.status(200).json({ message: "Session ended successfully." });
  } catch (error) {
    return res.status(200).json({ message: "Session ended via fallback." });
  }
}

module.exports = { startSession, submitAnswer, endSession };