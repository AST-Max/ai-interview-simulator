import React, { useEffect } from "react";
import { useSpeechToText } from "../../hooks/useSpeechToText";
import Button from "../common/Button";

export default function VoiceRecorder({ onTranscriptChange }) {
  const { transcript, isListening, isSupported, startListening, stopListening, resetTranscript } =
    useSpeechToText();

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

  if (!isSupported) {
    return (
      <p className="text-sm text-yellow-600">
        Voice input isn't supported in this browser. Please type your answer instead.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {!isListening ? (
        <Button onClick={startListening} variant="secondary">
          🎤 Start Speaking
        </Button>
      ) : (
        <Button onClick={stopListening} variant="danger">
          ⏹ Stop
        </Button>
      )}
      {transcript && (
        <button
          onClick={() => {
            resetTranscript();
            onTranscriptChange("");
          }}
          className="text-sm text-muted underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}
