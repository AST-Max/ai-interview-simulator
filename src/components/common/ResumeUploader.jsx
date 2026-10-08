import React, { useState, useEffect } from 'react';

const ResumeUploader = () => {
  // State to track if user already has a resume
  const [hasExistingResume, setHasExistingResume] = useState(false);
  const [currentFileName, setCurrentFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  // Jab page load ho, check kar ki resume hai ya nahi
  useEffect(() => {
    checkUserResume();
  }, []);

  const checkUserResume = async () => {
    try {
      const token = localStorage.getItem("token");
      // Create a simple GET route in backend to fetch user's resume status
      const response = await fetch('http://localhost:5000/api/resume/my-resume', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.resume) {
        setHasExistingResume(true);
        setCurrentFileName(data.resume.fileName);
      }
    } catch (error) {
      console.log("New user, no resume found yet.");
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:5000/api/resume/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }, // NO Content-Type here, let browser set it for FormData
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Will say either "First resume uploaded" or "Resume updated"
        setHasExistingResume(true);
        setCurrentFileName(file.name);
      }
    } catch (error) {
      alert("Upload failed.");
    } finally {
      setUploading(false);
      event.target.value = null; // THE FIX: Reset file input so user can re-upload same file if needed
    }
  };

  return (
    <div className="p-6 bg-surface rounded-xl border border-outline">
      <h3 className="text-lg font-bold mb-4">
        {hasExistingResume ? "Your Current Resume" : "Welcome! Let's get started."}
      </h3>
      
      {hasExistingResume && (
        <div className="mb-4 text-sm text-secondary">
          Active File: <span className="font-bold text-primary">{currentFileName}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input 
        type="file" 
        id="resume-upload" 
        accept=".pdf" 
        className="hidden" 
        onChange={handleFileSelect} 
      />
      
      {/* Dynamic Button */}
      <label 
        htmlFor="resume-upload" 
        className="cursor-pointer px-4 py-2 bg-primary text-on-primary rounded-md font-bold"
      >
        {uploading ? "Uploading..." : hasExistingResume ? "Update / Replace Resume" : "Upload Resume (PDF)"}
      </label>
    </div>
  );
};

export default ResumeUploader;