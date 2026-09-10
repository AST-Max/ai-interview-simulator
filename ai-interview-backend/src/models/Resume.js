const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    originalFileName: { type: String, required: true },
    extractedText: { type: String, required: true }, // raw text pulled via pdf-parse
    targetRole: { type: String, required: true },
    atsScore: { type: Number, default: 0 },
    matchedKeywords: [{ type: String }],
    missingKeywords: [{ type: String }],
    suggestions: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
