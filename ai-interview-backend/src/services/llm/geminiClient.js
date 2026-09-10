const { getGeminiModel } = require("../../config/geminiConfig");

// Generic helper: sends a prompt to Gemini and returns plain text response.
// All other LLM service files (questionGenerator, answerEvaluator) use this.
async function askGemini(prompt) {
  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Same as askGemini but expects/parses a JSON response.
// Prompts using this MUST explicitly instruct Gemini to return ONLY raw JSON, no markdown fences.
async function askGeminiForJSON(prompt) {
  const rawText = await askGemini(prompt);
  const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Gemini JSON response:", cleaned);
    throw new Error("AI response could not be parsed. Please try again.");
  }
}

module.exports = { askGemini, askGeminiForJSON };
