const fs = require("fs");
const pdfParse = require("pdf-parse");

// Extracts raw text from an uploaded PDF resume file
async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

module.exports = { extractTextFromPDF };
