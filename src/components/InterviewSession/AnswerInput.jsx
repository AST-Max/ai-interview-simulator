import React, { useState, useCallback } from "react";
import VoiceRecorder from "./VoiceRecorder";
import Button from "../common/Button";

export default function AnswerInput({ onSubmit, disabled }) {
  const [answer, setAnswer] = useState("");

  const handleTranscriptChange = useCallback((transcript) => {
    if (transcript) setAnswer(transcript);
  }, []);

  function handleSubmit() {
    if (!answer.trim()) return;
    onSubmit(answer.trim());
    setAnswer("");
  }

  return (
    <div className="bg-surface border border-surfaceBorder p-5 rounded-xl shadow-sm">
      <label className="block text-sm font-medium mb-2 text-gray-200">Your Answer</label>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={4}
        placeholder="Type your answer or use voice input below..."
        className="w-full border border-surfaceBorder bg-darker text-heading rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="flex items-center justify-between">
        <VoiceRecorder onTranscriptChange={handleTranscriptChange} />
        <Button onClick={handleSubmit} disabled={disabled || !answer.trim()}>
          Submit Answer
        </Button>
      </div>
    </div>
  );
}
