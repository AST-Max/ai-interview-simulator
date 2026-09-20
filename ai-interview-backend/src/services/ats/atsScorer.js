const { calculateATSScore } = require("./keywordMatcher");
const { getQualitativeSuggestions } = require("./atsQualitative");

// Combines algorithmic keyword matching + LLM qualitative suggestions
// into a single ATS report returned to the frontend.
async function generateATSReport(resumeText, targetRole) {
  console.log("DEBUG targetRole:", targetRole);
  console.log("DEBUG resumeText length:", resumeText ? resumeText.length : "UNDEFINED/EMPTY");
  console.log("DEBUG resumeText preview:", resumeText ? resumeText.substring(0, 200) : "N/A");

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