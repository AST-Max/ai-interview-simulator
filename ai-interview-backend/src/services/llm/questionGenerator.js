const { askGeminiForJSON } = require("./geminiClient");

// Generates the FIRST question of a session, based on resume + target role.
// Later questions come from adaptiveQuestionEngine.js instead.
async function generateFirstQuestion(resumeText, targetRole) {
  const prompt = `
You are an experienced interviewer conducting a mock interview for a "${targetRole}" position.

Candidate's resume:
"""
${resumeText}
"""

Ask ONE opening interview question that references something specific from their resume
(a project, skill, or experience). Keep it natural, like a real interviewer would ask.

Return ONLY raw JSON (no markdown) in exactly this shape:
{
  "question": "the question text",
  "difficulty": "medium"
}
`;

  return await askGeminiForJSON(prompt);
}

module.exports = { generateFirstQuestion };
