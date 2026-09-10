const mongoose = require("mongoose");

// Connects to MongoDB Atlas using MONGO_URI from .env
// Called once from server.js on startup
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
