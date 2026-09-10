import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OverallScore from "../components/FeedbackDashboard/OverallScore";
import QuestionWiseFeedback from "../components/FeedbackDashboard/QuestionWiseFeedback";
import CommunicationMetrics from "../components/FeedbackDashboard/CommunicationMetrics";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import { getSessionFeedback } from "../services/feedbackService";

export default function FeedbackReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionId } = location.state || {};
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    getSessionFeedback(sessionId).then((data) => {
      setFeedback(data);
      setLoading(false);
    });
  }, [sessionId]);

  if (loading) return <Loader text="Generating your feedback report..." />;

  if (!feedback) {
    return (
      <div className="text-center py-20">
        <p className="text-muted mb-4">No feedback found. Please complete an interview first.</p>
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">Your Interview Feedback</h1>

      <OverallScore
        overallScore={feedback.overallScore}
        contentScore={feedback.contentScore}
        communicationScore={feedback.communicationScore}
      />

      <QuestionWiseFeedback questionWise={feedback.questionWise} />

      <CommunicationMetrics
        fillerWordCount={feedback.fillerWordCount}
        averagePace={feedback.averagePace}
        strengths={feedback.strengths}
        improvements={feedback.improvements}
      />

      <div className="text-center mt-6">
        <Button onClick={() => navigate("/dashboard")}>Practice Again</Button>
      </div>
    </div>
  );
}
