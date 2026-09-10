import React from "react";

export default function SessionProgress({ current, total = 8 }) {
  const percent = Math.min((current / total) * 100, 100);
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-muted mb-1">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="w-full bg-surfaceBorder rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
