import React from "react";
import UploadBox from "../components/ResumeUpload/UploadBox";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="py-12 px-4">
      <h1 className="text-2xl font-bold text-center mb-2 text-heading">
        {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
      </h1>
      <p className="text-center text-muted mb-10">
        Upload your resume to get an ATS score and start a personalized mock interview.
      </p>
      <UploadBox />
    </div>
  );
}
