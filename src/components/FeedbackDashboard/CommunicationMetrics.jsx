import React from "react";

export default function CommunicationMetrics({ fillerWordCount, averagePace, strengths, improvements }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-surface border border-surfaceBorder p-5 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-3 text-heading">Communication Stats</h3>
        <p className="text-sm text-muted mb-1">
          Filler words used: <span className="font-medium">{fillerWordCount}</span>
        </p>
        <p className="text-sm text-muted">
          Average speaking pace: <span className="font-medium">{averagePace}</span>
        </p>
      </div>

      <div className="bg-surface border border-surfaceBorder p-5 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-2 text-green-700">Strengths</h3>
        <ul className="list-disc list-inside text-sm text-muted mb-3">
          {strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
        <h3 className="font-semibold mb-2 text-red-600">Areas to Improve</h3>
        <ul className="list-disc list-inside text-sm text-muted">
          {improvements.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
