// Calculates speaking pace (words per minute) given transcript + duration.
// durationSeconds should be tracked on frontend (time between recording start/stop).
function calculatePace(transcript, durationSeconds) {
  const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
  if (!durationSeconds || durationSeconds <= 0) return "N/A";

  const wordsPerMinute = Math.round((wordCount / durationSeconds) * 60);
  return `${wordsPerMinute} words/min`;
}

module.exports = { calculatePace };
