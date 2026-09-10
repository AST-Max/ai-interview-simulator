// dotenv.config() MUST be the very first thing that runs, before any other
// imports that rely on process.env (this was the exact lesson learned from
// the earlier VitalLens project's .env issue)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");

const authRoutes = require("./src/routes/authRoutes");
const resumeRoutes = require("./src/routes/resumeRoutes");
const interviewRoutes = require("./src/routes/interviewRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/feedback", feedbackRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Centralized error handler - must be mounted LAST
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
