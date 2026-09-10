import React from "react";

export default function KeywordSuggestions({ matchedKeywords, missingKeywords, suggestions }) {
  return (
    <div className="bg-surface border border-surfaceBorder p-6 rounded-xl shadow-sm">
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-heading">Matched Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {matchedKeywords.map((kw) => (
            <span key={kw} className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-heading">Missing Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {missingKeywords.map((kw) => (
            <span key={kw} className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-heading">Suggestions to Improve</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
