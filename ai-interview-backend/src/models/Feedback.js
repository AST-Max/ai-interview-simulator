const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
    overallScore: { type: Number, required: true },
    contentScore: { type: Number, required: true },
    communicationScore: { type: Number, required: true },
    fillerWordCount: { type: Number, default: 0 },
    averagePace: { type: String },
    strengths: [{ type: String }],
    improvements: [{ type: String }],
    questionWise: [
      {
        question: String,
        score: Number,
        note: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
