const { askGeminiForJSON } = require("./geminiClient");

// ============================================================
// UNIQUE DIFFERENTIATOR MODULE - Adaptive Difficulty Engine
// ============================================================
// This is what makes the project stand out from a plain "resume -> generic
// questions" chatbot. Instead of a fixed question list, every next question
// is generated fresh by Gemini, using the FULL conversation history
// (previous questions + answers + scores) as context.
//
// Logic (expressed to the LLM via prompt, not hardcoded if/else):
// - If the last answer scored LOW (weak) -> ask an easier or more basic
//   related question, to help the candidate recover and keep them engaged.
// - If the last answer scored HIGH (strong) -> ask a deeper follow-up or a
//   harder question, the way a real interviewer probes further when a
//   candidate demonstrates strong knowledge.
// - If it's a mid-range score -> stay at a similar difficulty level.
//
// No custom model training is involved - this is achieved purely through
// prompt engineering using the session's conversationHistory array.
// ============================================================

async function generateAdaptiveQuestion(conversationHistory, resumeText, targetRole) {
  const historyText = conversationHistory
    .map(
      (entry, i) =>
        `Q${i + 1} (${entry.difficulty}): ${entry.question}\nCandidate's answer: ${entry.answer}\nScore given: ${entry.contentScore}/10`
    )
    .join("\n\n");

  const lastEntry = conversationHistory[conversationHistory.length - 1];

  const prompt = `
You are an experienced interviewer conducting an adaptive mock interview for a "${targetRole}" position.

Candidate's resume:
"""
${resumeText}
"""

Conversation so far:
${historyText}

The candidate's most recent answer scored ${lastEntry.contentScore}/10.

Adaptive rule to follow:
- If the last score was 0-4 (weak): ask an EASIER question, either a simpler related concept
  or a more basic version of the same topic, to help the candidate regain confidence.
- If the last score was 5-7 (average): ask a MEDIUM difficulty question, either a new topic
  from their resume or a moderate follow-up.
- If the last score was 8-10 (strong): ask a HARDER follow-up question that goes deeper into
  the same topic, the way a real interviewer probes further when impressed.

Do not repeat a question already asked above. Ask ONE new question only.

Return ONLY raw JSON (no markdown) in exactly this shape:
{
  "question": "the next question text",
  "difficulty": "easy" | "medium" | "hard"
}
`;

  return await askGeminiForJSON(prompt);
}

module.exports = { generateAdaptiveQuestion };
