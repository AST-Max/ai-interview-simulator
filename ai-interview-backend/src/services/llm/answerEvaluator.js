const { askGeminiForJSON } = require("./geminiClient");

// Evaluates a candidate's answer for CONTENT quality (relevance, correctness, depth).
// Communication quality (filler words, pace) is handled separately in speechAnalysis/.
async function evaluateAnswer(question, answer, targetRole) {
  const prompt = `
You are an interviewer evaluating a candidate's answer for a "${targetRole}" position.

Question asked: "${question}"
Candidate's answer: "${answer}"

Evaluate the CONTENT of this answer only (technical correctness, relevance, depth) - ignore
grammar or speaking style. Score from 0 to 10.

Return ONLY raw JSON (no markdown) in exactly this shape:
{
  "score": 7,
  "note": "one short sentence explaining the score"
}
`;

  return await askGeminiForJSON(prompt);
}

module.exports = { evaluateAnswer };
