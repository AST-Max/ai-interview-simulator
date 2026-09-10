const Session = require("../models/Session");
const Resume = require("../models/Resume");
const { generateFirstQuestion } = require("../services/llm/questionGenerator");
const { generateAdaptiveQuestion } = require("../services/llm/adaptiveQuestionEngine");
const { evaluateAnswer } = require("../services/llm/answerEvaluator");
const { countFillerWords } = require("../services/speechAnalysis/fillerWordDetector");

const TOTAL_QUESTIONS = 5; // matches frontend InterviewPage.jsx TOTAL_QUESTIONS

async function startSession(req, res, next) {
  try {
    const { resumeId, targetRole } = req.body;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found." });
    }

    const firstQuestion = await generateFirstQuestion(resume.extractedText, targetRole);

    const session = await Session.create({
      userId: req.userId,
      resumeId,
      targetRole,
      conversationHistory: [],
    });

    res.status(201).json({
      sessionId: session._id,
      question: {
        id: "q1",
        text: firstQuestion.question,
        difficulty: firstQuestion.difficulty || "medium",
      },
    });
  } catch (error) {
    next(error);
  }
}

async function submitAnswer(req, res, next) {
  try {
    const { sessionId, questionText, questionDifficulty, answerText } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }

    const resume = await Resume.findById(session.resumeId);

    // Evaluate content quality of the answer
    const evaluation = await evaluateAnswer(questionText, answerText, session.targetRole);
    const fillerWordCount = countFillerWords(answerText);

    // Save this turn into conversation history - this powers the adaptive engine
    session.conversationHistory.push({
      question: questionText,
      difficulty: questionDifficulty || "medium",
      answer: answerText,
      contentScore: evaluation.score,
      fillerWordCount,
    });

    const isSessionComplete = session.conversationHistory.length >= TOTAL_QUESTIONS;

    let nextQuestion = null;
    if (!isSessionComplete) {
      nextQuestion = await generateAdaptiveQuestion(
        session.conversationHistory,
        resume.extractedText,
        session.targetRole
      );
    } else {
      session.isComplete = true;
    }

    await session.save();

    res.status(200).json({
      score: evaluation.score,
      feedback: evaluation.note,
      nextQuestion: nextQuestion
        ? {
            id: `q${session.conversationHistory.length + 1}`,
            text: nextQuestion.question,
            difficulty: nextQuestion.difficulty,
          }
        : null,
      isSessionComplete,
    });
  } catch (error) {
    next(error);
  }
}

async function endSession(req, res, next) {
  try {
    const { sessionId } = req.body;
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }
    session.isComplete = true;
    await session.save();
    res.status(200).json({ message: "Session ended.", sessionId: session._id });
  } catch (error) {
    next(error);
  }
}

module.exports = { startSession, submitAnswer, endSession };
