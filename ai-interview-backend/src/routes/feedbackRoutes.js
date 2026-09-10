const express = require("express");
const { getFeedback } = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:sessionId", authMiddleware, getFeedback);

module.exports = router;
