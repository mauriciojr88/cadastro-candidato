const pdfParse = require('pdf-parse');

function normalizeText(text) {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/ +/g, ' ')
    .trim();
}

function extractEmail(text) {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}

function extractPhone(text) {
  const match = text.match(/(\+55\s*)?(\(?\d{2}\)?\s*)?(9?\d{4}[- ]?\d{4})/);
  return match ? match[0] : null;
}

function extractName(text) {
  const nomeLabel = text.match(/Nome[:\-]?\s*([A-Za-zÀ-ÖØ-öø-ÿ'`´\s]+)/i);
  if (nomeLabel && nomeLabel[1]) {
    return nomeLabel[1].replace(/\s{2,}/g, ' ').trim();
  }

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length > 0 && lines[0].split(' ').length >= 2 && lines[0].length <= 80) {
    return lines[0];
  }

  return null;
}

function extractFields(text) {
  const normalized = normalizeText(text);

  const email = extractEmail(normalized);
  const phone = extractPhone(normalized);
  const name = extractName(text);

  return {
    name,
    email,
    phone,
    normalizedText: normalized
  };
}

async function processPdf(buffer) {
  const data = await pdfParse(buffer);
  const rawText = data.text || '';

  if (!rawText.trim()) {
    return {
      isScanned: true,
      name: null,
      email: null,
      phone: null,
      text: ''
    };
  }

  const { name, email, phone, normalizedText } = extractFields(rawText);

  return {
    isScanned: false,
    name,
    email,
    phone,
    text: normalizedText
  };
}

module.exports = {
  processPdf
};
