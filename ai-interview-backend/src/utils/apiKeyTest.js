// STANDALONE TEST SCRIPT - run this FIRST, before writing any other backend code.
// This isolates the API key/config problem from the rest of the app,
// so if something breaks, you know immediately whether it's the key or something else.
//
// How to run:
//   1. Create backend/.env (copy .env.example) and paste your GEMINI_API_KEY there
//   2. From the backend folder run: npm run test-key
//      (or directly: node src/utils/apiKeyTest.js)

require("dotenv").config(); // MUST be the very first line before other imports that need env vars

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testApiKey() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found in .env file.");
    console.error("   Make sure backend/.env exists and contains GEMINI_API_KEY=your_key");
    process.exit(1);
  }

  console.log("🔑 API key loaded from .env (length check):", apiKey.length, "characters");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const result = await model.generateContent(
      "Reply with exactly one sentence confirming you received this test message."
    );
    const response = result.response.text();

    console.log("✅ SUCCESS! Gemini API responded:");
    console.log(response);
  } catch (error) {
    console.error("❌ API call failed. Error details:");
    console.error(error.message);
    console.error("\nCommon causes:");
    console.error("- Invalid or expired API key (generate a new one at aistudio.google.com/app/apikey)");
    console.error("- No internet connection");
    console.error("- .env file not loaded correctly (check dotenv.config() runs first)");
    process.exit(1);
  }
}

testApiKey();
