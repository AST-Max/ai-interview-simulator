import React from "react";
import UploadBox from "../components/ResumeUpload/UploadBox";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-2 text-white">Welcome{user ? `, ${user.name}` : ""} 👋</h1>
      <p className="text-center text-muted mb-8">
        Upload your resume to get an ATS score and start a personalized mock interview.
      </p>
      <UploadBox />
    </div>
  );
}
