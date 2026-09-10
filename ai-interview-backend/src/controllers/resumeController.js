const fs = require("fs");
const Resume = require("../models/Resume");
const { extractTextFromPDF } = require("../services/resumeParser/pdfExtractor");
const { generateATSReport } = require("../services/ats/atsScorer");

async function uploadResume(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded." });
    }

    const { targetRole } = req.body;
    if (!targetRole) {
      return res.status(400).json({ message: "Target role is required." });
    }

    const extractedText = await extractTextFromPDF(req.file.path);

    // clean up the temp uploaded file after extracting text
    fs.unlink(req.file.path, () => {});

    const atsReport = await generateATSReport(extractedText, targetRole);

    const resume = await Resume.create({
      userId: req.userId,
      originalFileName: req.file.originalname,
      extractedText,
      targetRole,
      atsScore: atsReport.atsScore,
      matchedKeywords: atsReport.matchedKeywords,
      missingKeywords: atsReport.missingKeywords,
      suggestions: atsReport.suggestions,
    });

    res.status(201).json({
      resumeId: resume._id,
      atsScore: atsReport.atsScore,
      matchedKeywords: atsReport.matchedKeywords,
      missingKeywords: atsReport.missingKeywords,
      suggestions: atsReport.suggestions,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadResume };
