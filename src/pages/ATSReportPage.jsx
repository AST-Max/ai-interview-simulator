import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScoreCard from "../components/ATSReport/ScoreCard";
import KeywordSuggestions from "../components/ATSReport/KeywordSuggestions";
import InterviewStartModal from "../components/ATSReport/InterviewStartModal";
import Button from "../components/common/Button";
import { InterviewSessionContext } from "../context/InterviewSessionContext";
import { useAuth } from "../hooks/useAuth";

export default function ATSReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const session = useContext(InterviewSessionContext);
  const { user } = useAuth();
  const { atsReport, targetRole } = location.state || {};
  const [modalOpen, setModalOpen] = useState(false);

  if (!atsReport) {
    return (
      <div className="text-center py-20">
        <p className="text-muted mb-4">No ATS report found. Please upload a resume first.</p>
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      </div>
    );
  }

  function handleConfirmStart() {
    session.setResumeId(atsReport.resumeId);
    session.setTargetRole(targetRole);
    navigate("/interview");
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center text-heading">Your ATS Report</h1>

      {/* Combined dashboard card - score + keywords + gaps in one place */}
      <div className="bg-surface border border-surfaceBorder rounded-2xl p-8 mb-6">
        <div className="grid md:grid-cols-[auto_1fr] gap-8">
          <div className="flex justify-center md:justify-start">
            <ScoreCard score={atsReport.atsScore} targetRole={targetRole} />
          </div>
          <KeywordSuggestions
            matchedKeywords={atsReport.matchedKeywords}
            missingKeywords={atsReport.missingKeywords}
            suggestions={atsReport.suggestions}
          />
        </div>
      </div>

      <div className="text-center">
        <Button onClick={() => setModalOpen(true)} className="px-6 py-3">
          Start Mock Interview →
        </Button>
      </div>

      <InterviewStartModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmStart}
        targetRole={targetRole}
        atsScore={atsReport.atsScore}
        userName={user?.name}
      />
    </div>
  );
}
