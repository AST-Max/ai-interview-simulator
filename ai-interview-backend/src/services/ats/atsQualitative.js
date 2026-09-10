const { askGeminiForJSON } = require("../llm/geminiClient");

// Uses LLM to give qualitative resume suggestions (complements the algorithmic
// keyword matching done in keywordMatcher.js). Combined together in atsScorer.js
async function getQualitativeSuggestions(resumeText, targetRole) {
  const prompt = `
You are an experienced technical recruiter reviewing a resume for a "${targetRole}" position.

Resume text:
"""
${resumeText}
"""

Return ONLY raw JSON (no markdown, no explanation) in exactly this shape:
{
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Give 3 to 5 specific, actionable suggestions to improve this resume for the target role.
`;

  const result = await askGeminiForJSON(prompt);
  return result.suggestions || [];
}

module.exports = { getQualitativeSuggestions };
