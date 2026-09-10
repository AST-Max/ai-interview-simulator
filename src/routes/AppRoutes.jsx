import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import ATSReportPage from "../pages/ATSReportPage";
import InterviewPage from "../pages/InterviewPage";
import FeedbackReportPage from "../pages/FeedbackReportPage";
import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ats-report"
        element={
          <ProtectedRoute>
            <ATSReportPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <InterviewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback-report"
        element={
          <ProtectedRoute>
            <FeedbackReportPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
