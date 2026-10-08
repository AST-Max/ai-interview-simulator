import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Router import hata diya

// Pages Import
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InterviewPage from './pages/InterviewPage';
import FeedbackReportPage from './pages/FeedbackReportPage';

function App() {
  return (
    // Yahan se <Router> wrapper hata diya gaya hai
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path="/report" element={<FeedbackReportPage />} />
    </Routes>
  );
}

export default App;