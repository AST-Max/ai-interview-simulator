import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScoreCard from "../components/ATSReport/ScoreCard";
import KeywordSuggestions from "../components/ATSReport/KeywordSuggestions";
import Button from "../components/common/Button";
import { InterviewSessionContext } from "../context/InterviewSessionContext";

export default function ATSReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const session = useContext(InterviewSessionContext);
  const { atsReport, targetRole } = location.state || {};

  if (!atsReport) {
    return (
      <div className="text-center py-20">
        <p className="text-muted mb-4">No ATS report found. Please upload a resume first.</p>
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      </div>
    );
  }

  function handleStartInterview() {
    session.setResumeId(atsReport.resumeId);
    session.setTargetRole(targetRole);
    navigate("/interview");
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Your ATS Report</h1>
      <div className="mb-6 flex justify-center">
        <ScoreCard score={atsReport.atsScore} />
      </div>
      <KeywordSuggestions
        matchedKeywords={atsReport.matchedKeywords}
        missingKeywords={atsReport.missingKeywords}
        suggestions={atsReport.suggestions}
      />
      <div className="mt-6 text-center">
        <Button onClick={handleStartInterview}>Start Mock Interview →</Button>
      </div>
    </div>
  );
}
