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

  // Explicit list of already-asked questions, given directly to Gemini
  // so it has a concrete list to avoid instead of a vague "don't repeat" instruction.
  const askedQuestions = conversationHistory.map((e) => `- ${e.question}`).join("\n");

  // Explicit list of topics/skills/projects already touched, extracted from
  // the questions themselves - reinforces variety even when difficulty repeats.
  const topicsUsedCount = conversationHistory.length;

  const lastEntry = conversationHistory[conversationHistory.length - 1];

  const prompt = `
You are an experienced interviewer conducting an adaptive mock interview for a "${targetRole}" position.

Candidate's resume:
"""
${resumeText}
"""

Conversation so far (${topicsUsedCount} question(s) asked):
${historyText}

The candidate's most recent answer scored ${lastEntry.contentScore}/10.

STEP 1 - Pick the DIFFICULTY (independent of topic):
- Score 0-4 (weak): pick an EASIER difficulty than the last question.
- Score 5-7 (average): keep a SIMILAR difficulty to the last question.
- Score 8-10 (strong): pick a HARDER difficulty than the last question.

STEP 2 - Pick the TOPIC (this is separate from difficulty - never reuse a topic):
Look at the resume and pick a skill, project, tool, or experience that has NOT been the
subject of any question above. Scan the whole resume - education, projects, internships,
skills list, certifications - and choose something fresh. If every distinct resume item has
already been covered, pick a general behavioral or role-relevant question instead (e.g.
teamwork, a challenge faced, a design trade-off) rather than repeating a technical topic.

CRITICAL RULES:
- Do NOT ask any question with similar meaning to these already-asked questions:
${askedQuestions}
- Do NOT default to generic filler questions like "what is REST API" or "how would you scale
  this to 1 million users" unless the resume specifically supports that exact context and it
  has not been asked before.
- Every question must reference something SPECIFIC and NAMED from the resume text above
  (an actual project name, company name, or technology explicitly listed) - not a vague
  category.

Ask ONE new question only.

Return ONLY raw JSON (no markdown) in exactly this shape:
{
  "question": "the next question text",
  "difficulty": "easy" | "medium" | "hard"
}
`;

  console.log("========== ADAPTIVE PROMPT SENT ==========");
  console.log(prompt);
  console.log("========== END PROMPT ==========");

  const result = await askGeminiForJSON(prompt);

  console.log("========== GEMINI RAW RESULT ==========");
  console.log(JSON.stringify(result, null, 2));
  console.log("========== END RESULT ==========");

  return result;
}

module.exports = { generateAdaptiveQuestion };