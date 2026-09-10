import api from "./api";

const USE_MOCK = true;

export async function getSessionFeedback(sessionId) {
  if (USE_MOCK) {
    await fakeDelay(700);
    return {
      overallScore: 7.2,
      contentScore: 7.5,
      communicationScore: 6.8,
      fillerWordCount: 12,
      averagePace: "142 words/min",
      questionWise: [
        { question: "Tell me about a project you're proud of.", score: 8, note: "Clear and structured answer." },
        { question: "How would you optimize this for scale?", score: 6, note: "Good idea but lacked technical depth." },
      ],
      strengths: ["Clear communication", "Good project explanation"],
      improvements: ["Reduce filler words", "Add more technical depth in system design answers"],
    };
  }
  const res = await api.get(`/feedback/${sessionId}`);
  return res.data;
}

function fakeDelay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
