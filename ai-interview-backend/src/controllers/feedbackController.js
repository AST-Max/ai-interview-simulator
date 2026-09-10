const Session = require("../models/Session");
const Feedback = require("../models/Feedback");
const { calculatePace } = require("../services/speechAnalysis/paceCalculator");

async function getFeedback(req, res, next) {
  try {
    const { sessionId } = req.params;

    // Return cached feedback if already generated
    let feedback = await Feedback.findOne({ sessionId });
    if (feedback) {
      return res.status(200).json(feedback);
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }

    const history = session.conversationHistory;
    if (history.length === 0) {
      return res.status(400).json({ message: "No answers recorded in this session yet." });
    }

    const contentScore = average(history.map((h) => h.contentScore));
    const totalFillerWords = history.reduce((sum, h) => sum + h.fillerWordCount, 0);

    // Communication score: simple heuristic - fewer filler words per answer = higher score
    const avgFillerPerAnswer = totalFillerWords / history.length;
    const communicationScore = Math.max(0, Math.min(10, 10 - avgFillerPerAnswer));

    const overallScore = Number(((contentScore + communicationScore) / 2).toFixed(1));

    const strengths = [];
    const improvements = [];
    if (contentScore >= 7) strengths.push("Strong technical/content accuracy across answers.");
    if (contentScore < 7) improvements.push("Add more technical depth and specific examples in answers.");
    if (avgFillerPerAnswer < 2) strengths.push("Clear, concise communication with minimal filler words.");
    if (avgFillerPerAnswer >= 2) improvements.push("Reduce filler words (um, like, uh) for clearer delivery.");

    const questionWise = history.map((h) => ({
      question: h.question,
      score: h.contentScore,
      note: `Difficulty: ${h.difficulty}, Filler words used: ${h.fillerWordCount}`,
    }));

    feedback = await Feedback.create({
      sessionId,
      overallScore,
      contentScore: Number(contentScore.toFixed(1)),
      communicationScore: Number(communicationScore.toFixed(1)),
      fillerWordCount: totalFillerWords,
      averagePace: calculatePace(history.map((h) => h.answer).join(" "), history.length * 60), // rough estimate
      strengths,
      improvements,
      questionWise,
    });

    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
}

function average(numbers) {
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

module.exports = { getFeedback };
