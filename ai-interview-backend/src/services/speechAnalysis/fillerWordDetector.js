// Counts common filler words in a transcript (from Web Speech API on frontend).
// Rule-based - no ML training needed for this.
const FILLER_WORDS = ["um", "uh", "like", "you know", "basically", "actually", "so yeah", "kind of", "sort of"];

function countFillerWords(transcript) {
  const lowerText = transcript.toLowerCase();
  let count = 0;
  FILLER_WORDS.forEach((filler) => {
    const regex = new RegExp(`\\b${filler}\\b`, "g");
    const matches = lowerText.match(regex);
    if (matches) count += matches.length;
  });
  return count;
}

module.exports = { countFillerWords, FILLER_WORDS };
