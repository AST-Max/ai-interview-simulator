import React from "react";

export default function ScoreCard({ score }) {
  const color = score >= 75 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-600";
  const ringColor = score >= 75 ? "stroke-green-600" : score >= 50 ? "stroke-yellow-600" : "stroke-red-600";
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center bg-surface border border-surfaceBorder p-6 rounded-xl shadow-sm">
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={ringColor}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <p className={`text-3xl font-bold -mt-16 ${color}`}>{score}%</p>
      <p className="mt-16 text-muted text-sm">ATS Match Score</p>
    </div>
  );
}
