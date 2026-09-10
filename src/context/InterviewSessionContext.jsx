import React, { createContext, useState } from "react";

export const InterviewSessionContext = createContext(null);

export function InterviewSessionProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [history, setHistory] = useState([]); // { question, answer, score, difficulty }
  const [resumeId, setResumeId] = useState(null);
  const [targetRole, setTargetRole] = useState(null);

  function addToHistory(entry) {
    setHistory((prev) => [...prev, entry]);
  }

  function resetSession() {
    setSessionId(null);
    setCurrentQuestion(null);
    setHistory([]);
  }

  return (
    <InterviewSessionContext.Provider
      value={{
        sessionId,
        setSessionId,
        currentQuestion,
        setCurrentQuestion,
        history,
        addToHistory,
        resumeId,
        setResumeId,
        targetRole,
        setTargetRole,
        resetSession,
      }}
    >
      {children}
    </InterviewSessionContext.Provider>
  );
}
