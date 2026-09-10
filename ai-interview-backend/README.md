# AI Interview Simulator - Backend

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in:
   - MONGO_URI (from MongoDB Atlas)
   - GEMINI_API_KEY (from aistudio.google.com/app/apikey)
   - JWT_SECRET (any random long string)
3. Test the Gemini key FIRST: `npm run test-key`
4. Once that succeeds, start the server: `npm run dev`

Server runs on http://localhost:5000

## API Endpoints
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/resume/upload (multipart form: resume file + targetRole)
- POST /api/interview/start
- POST /api/interview/answer
- POST /api/interview/end
- GET  /api/feedback/:sessionId

## Adaptive Difficulty
See src/services/llm/adaptiveQuestionEngine.js - the core differentiator.
Uses Session.conversationHistory (question + answer + score for each turn)
to decide whether the next question should be easier, same level, or harder.
