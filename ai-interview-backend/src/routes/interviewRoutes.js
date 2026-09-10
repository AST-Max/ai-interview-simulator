const express = require("express");
const { startSession, submitAnswer, endSession } = require("../controllers/interviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/start", authMiddleware, startSession);
router.post("/answer", authMiddleware, submitAnswer);
router.post("/end", authMiddleware, endSession);

module.exports = router;
