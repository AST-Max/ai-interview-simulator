const { calculateATSScore } = require("./keywordMatcher");
const { getQualitativeSuggestions } = require("./atsQualitative");

// Combines algorithmic keyword matching + LLM qualitative suggestions
// into a single ATS report returned to the frontend.
async function generateATSReport(resumeText, targetRole) {
  const { score, matchedKeywords, missingKeywords } = calculateATSScore(resumeText, targetRole);
  const suggestions = await getQualitativeSuggestions(resumeText, targetRole);

  return {
    atsScore: score,
    matchedKeywords,
    missingKeywords,
    suggestions,
  };
}

module.exports = { generateATSReport };
