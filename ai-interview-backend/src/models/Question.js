const mongoose = require("mongoose");

// Not strictly required as a separate collection (questions are also embedded in Session),
// but kept as a standalone model in case you want a reusable question bank later.
const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    role: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
