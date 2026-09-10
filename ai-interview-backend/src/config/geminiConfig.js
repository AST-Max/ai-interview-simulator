const { GoogleGenerativeAI } = require("@google/generative-ai");

// Single shared Gemini client instance, used by questionGenerator.js and answerEvaluator.js
// Model name confirmed working via apiKeyTest.js
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function getGeminiModel() {
  return genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
}

module.exports = { getGeminiModel };
