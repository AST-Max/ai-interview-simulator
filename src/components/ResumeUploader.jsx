import React, { useState, useEffect } from 'react';

const ResumeUploader = () => {
  const [hasExistingResume, setHasExistingResume] = useState(false);
  const [currentFileName, setCurrentFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    checkUserResume();
  }, []);

  const checkUserResume = async () => {
    try {
      const token = localStorage.getItem("token");
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
        headers: { 'Authorization': `Bearer ${token}` }, // Browser automatically sets correct Content-Type for FormData
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); 
        setHasExistingResume(true);
        setCurrentFileName(file.name);
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      alert("Network error during upload.");
    } finally {
      setUploading(false);
      event.target.value = null; // Resets input so you can select the same file again if needed
    }
  };

  return (
    <div className="relative group cursor-pointer rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 border-2 border-dashed bg-surface-container-low/50 hover:bg-surface-container-low border-outline-variant/50 hover:border-primary/50">
      
      <div className="w-14 h-14 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm mb-4 group-hover:scale-105 transition-transform duration-200 border border-outline-variant/20">
        <span className="material-symbols-outlined text-[28px]">
          {hasExistingResume ? 'check_circle' : 'cloud_upload'}
        </span>
      </div>
      
      <p className="text-base text-on-surface font-bold mb-2">
        {hasExistingResume ? "Resume Parsed Successfully" : "Drop your PDF Resume here"}
      </p>

      {hasExistingResume ? (
        <div className="text-sm text-secondary mb-5">
          Active File: <span className="font-bold text-primary">{currentFileName}</span>
        </div>
      ) : (
        <p className="text-xs text-secondary mb-5 max-w-sm leading-relaxed">
          Supports PDF up to 10MB • Auto-extracts tech stack, leadership depth & work experience
        </p>
      )}

      <input 
        type="file" 
        id="resume-upload" 
        accept=".pdf" 
        className="hidden" 
        onChange={handleFileSelect} 
      />
      
      <label 
        htmlFor="resume-upload" 
        className={`cursor-pointer px-6 py-2 rounded-full text-xs font-bold shadow-sm transition-colors border ${
          uploading 
            ? 'bg-surface-container-high text-secondary border-outline-variant/30' 
            : 'bg-primary text-on-primary hover:bg-primary/90 border-transparent'
        }`}
      >
        {uploading ? "Uploading..." : hasExistingResume ? "Re-upload Resume" : "Browse Files"}
      </label>
    </div>
  );
};

export default ResumeUploader;