import React from "react";

const DIFFICULTY_STYLES = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

// Shows the difficulty badge so during demo you can visibly show the
// adaptive difficulty engine reacting to answer quality.
export default function QuestionCard({ question, difficulty }) {
  return (
    <div className="bg-surface border border-surfaceBorder p-5 rounded-xl shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-heading">Interview Question</h3>
        {difficulty && (
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${DIFFICULTY_STYLES[difficulty]}`}>
            {difficulty.toUpperCase()}
          </span>
        )}
      </div>
      <p className="text-gray-200">{question}</p>
    </div>
  );
}
