import api from "./api";

const USE_MOCK = true;

// Mock question bank simulating adaptive difficulty behavior
const MOCK_QUESTIONS = {
  easy: "Can you explain what REST API means in simple terms?",
  medium: "Walk me through how you designed the database schema for your last project.",
  hard: "How would you optimize this system if it had to handle 1 million concurrent users?",
};

// Starts a new interview session, returns sessionId + first question
export async function startInterviewSession(resumeId, targetRole) {
  if (USE_MOCK) {
    await fakeDelay(800);
    return {
      sessionId: "mock-session-id-456",
      question: {
        id: "q1",
        text: "Tell me about a project from your resume that you're most proud of.",
        difficulty: "medium",
      },
    };
  }
  const res = await api.post("/interview/start", { resumeId, targetRole });
  return res.data;
}

// Submits candidate's answer, backend runs adaptiveQuestionEngine to pick next question
export async function submitAnswer(sessionId, questionId, answerText) {
  if (USE_MOCK) {
    await fakeDelay(1000);
    // crude mock: longer answers are treated as "stronger" to demo adaptive difficulty
    const strength = answerText.length > 80 ? "hard" : answerText.length > 30 ? "medium" : "easy";
    return {
      score: strength === "hard" ? 9 : strength === "medium" ? 6 : 3,
      feedback: "Mock evaluation: this will be replaced by real LLM scoring.",
      nextQuestion: {
        id: "q" + Math.floor(Math.random() * 1000),
        text: MOCK_QUESTIONS[strength],
        difficulty: strength,
      },
      isSessionComplete: false,
    };
  }
  const res = await api.post("/interview/answer", { sessionId, questionId, answerText });
  return res.data;
}

export async function endInterviewSession(sessionId) {
  if (USE_MOCK) {
    await fakeDelay(500);
    return { message: "Session ended", sessionId };
  }
  const res = await api.post("/interview/end", { sessionId });
  return res.data;
}

function fakeDelay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
