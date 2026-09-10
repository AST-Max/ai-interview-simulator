const mongoose = require("mongoose");

// conversationHistory is the core data structure powering the ADAPTIVE DIFFICULTY engine.
// Each entry stores what was asked, what was answered, and how it scored -
// this is passed back to Gemini as context when generating the next question.
const conversationEntrySchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    answer: { type: String, required: true },
    contentScore: { type: Number, required: true }, // 0-10, from answerEvaluator.js
    fillerWordCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "Resume", required: true },
    targetRole: { type: String, required: true },
    conversationHistory: [conversationEntrySchema],
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
