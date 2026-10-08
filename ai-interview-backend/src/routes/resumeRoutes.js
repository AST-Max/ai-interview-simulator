const express = require("express");
const { uploadResume, scanAtsLocally } = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Route for file upload
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

// Route for ML ATS Scan
router.post("/ats-scan", scanAtsLocally);

module.exports = router;