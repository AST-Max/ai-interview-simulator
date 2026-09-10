import React from "react";

export default function QuestionWiseFeedback({ questionWise }) {
  return (
    <div className="bg-surface border border-surfaceBorder p-5 rounded-xl shadow-sm mb-6">
      <h3 className="font-semibold mb-3 text-heading">Question-wise Breakdown</h3>
      <div className="space-y-3">
        {questionWise.map((q, i) => (
          <div key={i} className="border-b last:border-b-0 pb-3 last:pb-0">
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-200 flex-1">{q.question}</p>
              <span className="text-sm font-semibold text-primary ml-3">{q.score}/10</span>
            </div>
            <p className="text-xs text-muted mt-1">{q.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
