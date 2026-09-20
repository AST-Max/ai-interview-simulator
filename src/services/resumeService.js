import api from "./api";

const USE_MOCK = false;

// Uploads resume file + selected role, returns ATS analysis report
export async function uploadResumeForATS(file, targetRole) {
  if (USE_MOCK) {
    await fakeDelay(1200);
    return {
      atsScore: 72,
      matchedKeywords: ["React", "Node.js", "MongoDB", "REST API"],
      missingKeywords: ["Docker", "CI/CD", "Unit Testing"],
      suggestions: [
        "Add a dedicated 'Projects' section highlighting measurable impact.",
        "Include Docker or containerization experience if any.",
        "Mention testing frameworks used (Jest, Mocha, etc.).",
      ],
      resumeId: "mock-resume-id-123",
    };
  }
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("targetRole", targetRole);
  const res = await api.post("/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

function fakeDelay(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
