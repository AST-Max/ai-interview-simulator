import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AvatarViewer from "../components/Avatar3D/AvatarViewer";
import QuestionCard from "../components/InterviewSession/QuestionCard";
import AnswerInput from "../components/InterviewSession/AnswerInput";
import SessionProgress from "../components/InterviewSession/SessionProgress";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import { InterviewSessionContext } from "../context/InterviewSessionContext";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { startInterviewSession, submitAnswer, endInterviewSession } from "../services/interviewService";

const TOTAL_QUESTIONS = 5; // demo length; adjust as needed

export default function InterviewPage() {
  const session = useContext(InterviewSessionContext);
  const { speak, isSpeaking } = useTextToSpeech();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  const initSession = useCallback(async () => {
    setLoading(true);
    const data = await startInterviewSession(session.resumeId, session.targetRole);
    session.setSessionId(data.sessionId);
    session.setCurrentQuestion(data.question);
    setQuestionCount(1);
    setLoading(false);
    // Speak the first question once avatar is ready
    setTimeout(() => speak(data.question.text), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initSession();
  }, [initSession]);

  async function handleAnswerSubmit(answerText) {
    setSubmitting(true);
    const result = await submitAnswer(session.sessionId, session.currentQuestion.id, answerText);

    session.addToHistory({
      question: session.currentQuestion.text,
      answer: answerText,
      score: result.score,
      difficulty: session.currentQuestion.difficulty,
    });

    if (questionCount >= TOTAL_QUESTIONS || result.isSessionComplete) {
      await endInterviewSession(session.sessionId);
      navigate("/feedback-report", { state: { sessionId: session.sessionId } });
      return;
    }

    session.setCurrentQuestion(result.nextQuestion);
    setQuestionCount((prev) => prev + 1);
    setSubmitting(false);
    setTimeout(() => speak(result.nextQuestion.text), 300);
  }

  if (loading) return <Loader text="Preparing your interview..." />;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-xl font-bold text-center mb-4 text-white">Mock Interview — {session.targetRole}</h1>

      <AvatarViewer isSpeaking={isSpeaking} />

      <div className="mt-6">
        <SessionProgress current={questionCount} total={TOTAL_QUESTIONS} />
        <QuestionCard
          question={session.currentQuestion?.text}
          difficulty={session.currentQuestion?.difficulty}
        />
        <AnswerInput onSubmit={handleAnswerSubmit} disabled={submitting || isSpeaking} />
      </div>

      {submitting && <Loader text="Evaluating your answer..." />}

      <div className="text-center mt-4">
        <Button
          variant="secondary"
          onClick={() => navigate("/dashboard")}
        >
          End Interview Early
        </Button>
      </div>
    </div>
  );
}
