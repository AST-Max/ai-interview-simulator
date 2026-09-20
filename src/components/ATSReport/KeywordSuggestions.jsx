import React from "react";

export default function KeywordSuggestions({ matchedKeywords, missingKeywords, suggestions }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
          Matched keywords
        </h3>
        <div className="flex flex-wrap gap-2">
          {matchedKeywords.map((kw) => (
            <span
              key={kw}
              className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
          Skill gaps
        </h3>
        <div className="flex flex-wrap gap-2">
          {missingKeywords.map((kw) => (
            <span
              key={kw}
              className="px-3 py-1 text-sm rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
          Suggestions to improve
        </h3>
        <ul className="space-y-1.5">
          {suggestions.map((s, i) => (
            <li key={i} className="text-sm text-muted flex gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
