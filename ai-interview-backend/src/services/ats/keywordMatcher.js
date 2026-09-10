const natural = require("natural");
const TfIdf = natural.TfIdf;

// A curated list of common technical/role keywords to check for.
// In a real system, this could be derived from an actual job description upload instead.
const ROLE_KEYWORDS = {
  "Software Engineer": ["javascript", "python", "java", "git", "api", "database", "algorithms", "docker", "testing", "agile"],
  "Frontend Developer": ["react", "javascript", "css", "html", "typescript", "responsive", "ui", "ux", "webpack", "accessibility"],
  "Backend Developer": ["node.js", "express", "database", "api", "sql", "mongodb", "authentication", "microservices", "docker", "rest"],
  "Data Analyst": ["sql", "excel", "python", "tableau", "power bi", "statistics", "data visualization", "reporting", "etl"],
  "Data Scientist": ["python", "machine learning", "pandas", "numpy", "statistics", "tensorflow", "sql", "data modeling"],
  "Product Manager": ["roadmap", "stakeholder", "agile", "user research", "analytics", "prioritization", "kpi", "wireframe"],
};

function calculateATSScore(resumeText, targetRole) {
  const keywords = ROLE_KEYWORDS[targetRole] || [];
  const lowerResume = resumeText.toLowerCase();

  const matchedKeywords = keywords.filter((kw) => lowerResume.includes(kw.toLowerCase()));
  const missingKeywords = keywords.filter((kw) => !lowerResume.includes(kw.toLowerCase()));

  const score = keywords.length > 0
    ? Math.round((matchedKeywords.length / keywords.length) * 100)
    : 0;

  return { score, matchedKeywords, missingKeywords };
}

function calculateTfIdfSimilarity(resumeText, jobDescriptionText) {
  const tfidf = new TfIdf();
  tfidf.addDocument(resumeText);
  tfidf.addDocument(jobDescriptionText);

  const terms = new Set();
  tfidf.listTerms(1).forEach((item) => terms.add(item.term));

  let overlapCount = 0;
  tfidf.listTerms(0).forEach((item) => {
    if (terms.has(item.term)) overlapCount++;
  });

  return overlapCount;
}

module.exports = { calculateATSScore, calculateTfIdfSimilarity, ROLE_KEYWORDS };
