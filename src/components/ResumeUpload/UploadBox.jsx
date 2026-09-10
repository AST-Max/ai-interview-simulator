import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RoleSelector from "./RoleSelector";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { uploadResumeForATS } from "../../services/resumeService";

export default function UploadBox() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  function handleFileSelect(selectedFile) {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please upload a PDF file only.");
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files[0]);
  }

  async function handleSubmit() {
    if (!file || !role) {
      setError("Please select a resume file and a target role.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const atsReport = await uploadResumeForATS(file, role);
      // Pass data forward via navigation state (simple approach for now)
      navigate("/ats-report", { state: { atsReport, targetRole: role } });
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader text="Analyzing your resume..." />;

  return (
    <div className="max-w-lg mx-auto bg-surface border border-surfaceBorder p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-heading">Upload Your Resume</h2>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          dragActive ? "border-primary bg-indigo-50" : "border-surfaceBorder"
        }`}
      >
        <p className="text-muted">
          {file ? file.name : "Drag & drop your resume PDF here, or click to browse"}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />
      </div>

      <div className="mt-4">
        <RoleSelector value={role} onChange={setRole} />
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <Button onClick={handleSubmit} className="w-full">
        Analyze Resume
      </Button>
    </div>
  );
}
