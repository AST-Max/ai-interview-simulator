import React from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";

// Friendly confirmation moment before jumping into the interview session,
// inspired by the "Interview Invitation" concept - personalized, not just a redirect.
export default function InterviewStartModal({ isOpen, onClose, onConfirm, targetRole, atsScore, userName }) {
  const matchLevel = atsScore >= 75 ? "a strong match" : atsScore >= 50 ? "a solid match" : "a starting point";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-5">
          <span className="text-xl">🎙️</span>
        </div>
        <h2 className="text-xl font-bold text-heading mb-2">
          {userName ? `Ready, ${userName}?` : "Ready to begin?"}
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-6">
          Your resume is {matchLevel} for <span className="text-heading font-medium">{targetRole}</span>.
          The mock interview will ask questions based on what's in it — answer by voice or text,
          and the difficulty will adjust as you go.
        </p>
        <div className="flex flex-col gap-3">
          <Button onClick={onConfirm} className="w-full">
            Start interview
          </Button>
          <button
            onClick={onClose}
            className="text-sm text-muted hover:text-heading transition py-2"
          >
            Not right now
          </button>
        </div>
      </div>
    </Modal>
  );
}
