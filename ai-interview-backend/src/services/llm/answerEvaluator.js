const { askGeminiForJSON } = require("./geminiClient");

// Evaluates a candidate's answer for CONTENT quality (relevance, correctness, depth).
// Communication quality (filler words, pace) is handled separately in speechAnalysis/.
//
// IMPORTANT: This is the module responsible for telling the candidate whether they got
// something right or wrong, and what to improve. Accuracy here matters more than anywhere
// else in the app, since candidates rely on this to know what to actually study/fix.
// The prompt forces Gemini to reason step-by-step BEFORE scoring, rather than jumping
// straight to a number - this avoids shallow/generic scoring.
async function evaluateAnswer(question, answer, targetRole) {
  const prompt = `
You are a strict, experienced technical interviewer evaluating a candidate's answer for a
"${targetRole}" position. Your evaluation will be shown directly to the candidate to help
them improve, so it must be SPECIFIC and ACCURATE - never vague or generic.

Question asked: "${question}"
Candidate's answer: "${answer}"

Evaluate in this exact order:

1. First, identify what a CORRECT or STRONG answer to this specific question would need to
   include (key concepts, correct terminology, or specific reasoning).
2. Compare the candidate's actual answer against that - point by point.
3. Note anything factually wrong, missing, too vague, or off-topic.
4. If the answer is empty, nonsensical, just a number/word with no real content (e.g. "1", "2",
   "idk", random keys), or unrelated to the question, treat it as INCORRECT with a score of
   0-2, regardless of any keywords it happens to contain.
5. Only give a HIGH score (8-10) if the answer is technically accurate, relevant, and
   reasonably complete. Do not be generous - a partially correct or vague answer should score
   in the 3-6 range, not higher.

Return ONLY raw JSON (no markdown) in exactly this shape:
{
  "score": 7,
  "verdict": "correct" | "partially_correct" | "incorrect",
  "whatWasWrong": "specific sentence on what was missing, wrong, or weak - empty string if fully correct",
  "suggestion": "one specific, actionable sentence on what to study or say differently next time"
}

Rules for the fields:
- "whatWasWrong" must name the SPECIFIC missing concept or error (e.g. "Didn't mention that
  REST is stateless, which is the core defining trait" not "needs more detail").
- "suggestion" must be concrete and actionable (e.g. "Review the stateless vs stateful
  distinction and give one real example of a REST endpoint" not "study more").
- If the answer is empty/nonsense, whatWasWrong should say so plainly (e.g. "No real answer
  was given - this needs an actual explanation of the concept.").
`;

  const result = await askGeminiForJSON(prompt);

  // Defensive defaults in case Gemini omits a field despite instructions
  return {
    score: typeof result.score === "number" ? result.score : 0,
    verdict: result.verdict || "incorrect",
    whatWasWrong: result.whatWasWrong || "",
    suggestion: result.suggestion || "",
    // kept for backward compatibility with any code still reading `note`
    note: result.whatWasWrong || result.suggestion || "",
  };
}

module.exports = { evaluateAnswer };