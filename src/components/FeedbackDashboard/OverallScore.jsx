import React from "react";

export default function OverallScore({ overallScore, contentScore, communicationScore }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <ScoreBlock label="Overall" value={overallScore} highlight />
      <ScoreBlock label="Content" value={contentScore} />
      <ScoreBlock label="Communication" value={communicationScore} />
    </div>
  );
}

function ScoreBlock({ label, value, highlight }) {
  return (
    <div className={`p-4 rounded-xl text-center ${highlight ? "bg-primary text-heading" : "bg-surface border border-surfaceBorder shadow-sm"}`}>
      <p className="text-2xl font-bold">{value}/10</p>
      <p className={`text-sm ${highlight ? "text-indigo-100" : "text-muted"}`}>{label}</p>
    </div>
  );
}
