const fs = require("fs");
const pdfParse = require("pdf-parse");

// Extracts raw text from an uploaded PDF resume file
async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);

  console.log("DEBUG PDF extracted text length:", data.text.length);
  console.log("DEBUG PDF extracted text preview:", data.text.substring(0, 300));

  return data.text;
}

module.exports = { extractTextFromPDF };