import React from "react";

export default function ScoreCard({ score, targetRole }) {
  const ringColor = score >= 75 ? "#22C55E" : score >= 50 ? "#EAB308" : "#EF4444";
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#1F2444" strokeWidth="7" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={ringColor}
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <p className="text-3xl font-bold text-heading -mt-[92px]">{score}%</p>
      <p className="mt-[52px] text-sm text-muted">ATS match score</p>
      {targetRole && <p className="text-sm font-medium text-heading mt-1">{targetRole}</p>}
    </div>
  );
}
