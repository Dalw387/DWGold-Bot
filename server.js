"use strict";

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const twilio = require("twilio");

const app = express();
const PORT = process.env.PORT || 3000;

const KNOWLEDGE_DIR = path.join(__dirname, "knowledge");

const DISCLAIMER =
  "Education only. Not financial, investment, or trading advice.";

const REFUSAL =
  "DW Gold Trading provides education only. We do not provide trading " +
  "signals, financial advice, investment advice, or market predictions.";

// Patterns that indicate the user is asking for advice/signals/predictions,
// which this education-only bot must refuse.
const REFUSAL_PATTERNS = [
  /\b(should|shall|can|could|would|will|do)\s+i\s+(buy|sell|trade|invest|enter|exit|hold)\b/,
  /\bwhen\s+(should\s+i\s+|to\s+|do\s+i\s+)?(buy|sell|enter|exit)\b/,
  /\b(buy|sell)\s+(gold|xauusd|now|signal|signals)\b/,
  /\b(trading\s+)?signals?\b/,
  /\b(price\s+)?(prediction|predictions|predict|forecast|forecasts)\b/,
  /\bwhere\s+is\s+(gold|price|xauusd)\s+(going|heading)\b/,
  /\bfinancial\s+advice\b/,
  /\binvestment\s+advice\b/,
  /\bgive\s+me\s+(a\s+)?(signal|signals|trade|entry|tip|tips)\b/,
  /\bis\s+(it|now)\s+a\s+good\s+time\s+to\s+(buy|sell)\b/,
  /\bwhat\s+will\s+(gold|price|xauusd)\s+(do|be)\b/,
];

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "of", "to", "in", "on", "for", "and", "or", "but", "if", "then",
  "what", "which", "who", "whom", "this", "that", "these", "those",
  "do", "does", "did", "how", "why", "when", "where", "can", "could",
  "would", "should", "i", "you", "me", "my", "your", "it", "its",
  "about", "with", "as", "at", "by", "from", "into", "please", "tell",
  "explain", "mean", "means", "meaning", "define", "definition",
]);

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

// Load every markdown file in the knowledge directory and split it into
// sections keyed by their "## " headings.
function loadKnowledge(dir) {
  const sections = [];
  let files = [];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch (err) {
    console.warn(`Knowledge directory not found at ${dir}: ${err.message}`);
    return sections;
  }

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const lines = raw.split(/\r?\n/);
    let current = null;
    for (const line of lines) {
      const heading = line.match(/^##\s+(.*)$/);
      if (heading) {
        if (current) sections.push(current);
        current = { title: heading[1].trim(), body: [], source: file };
      } else if (current) {
        current.body.push(line);
      }
    }
    if (current) sections.push(current);
  }

  return sections.map((s) => ({
    title: s.title,
    source: s.source,
    body: s.body.join("\n").trim(),
    titleTokens: tokenize(s.title),
    bodyTokens: tokenize(s.body.join(" ")),
  }));
}

const KNOWLEDGE = loadKnowledge(KNOWLEDGE_DIR);
console.log(
  `Loaded ${KNOWLEDGE.length} knowledge sections from ${KNOWLEDGE_DIR}`
);

function isRefusal(message) {
  const text = (message || "").toLowerCase();
  return REFUSAL_PATTERNS.some((re) => re.test(text));
}

// Score knowledge sections against the query and return the best match.
function search(message) {
  const queryTokens = tokenize(message);
  if (queryTokens.length === 0) return null;
  const querySet = new Set(queryTokens);

  let best = null;
  let bestScore = 0;

  for (const section of KNOWLEDGE) {
    let score = 0;
    const titleSet = new Set(section.titleTokens);
    const bodySet = new Set(section.bodyTokens);
    for (const token of querySet) {
      if (titleSet.has(token)) score += 3;
      else if (bodySet.has(token)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = section;
    }
  }

  return bestScore >= 2 ? best : null;
}

function buildReply(message) {
  if (isRefusal(message)) {
    return REFUSAL;
  }

  const match = search(message);
  if (match) {
    return `${match.body}\n\n${DISCLAIMER}`;
  }

  return (
    "I can help with beginner gold trading education such as stop loss, " +
    "take profit, lot size, spread, MT5, and risk management. " +
    "Try asking, for example: \"What is a stop loss?\"\n\n" +
    DISCLAIMER
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.type("text/plain").send(
    "DW Gold Trading WhatsApp education bot is running.\n" +
      `Loaded ${KNOWLEDGE.length} knowledge sections.\n\n` +
      "POST /test    { \"message\": \"...\" }  -> JSON reply\n" +
      "POST /whatsapp (Twilio webhook)       -> TwiML reply"
  );
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", sections: KNOWLEDGE.length });
});

app.post("/test", (req, res) => {
  const message = (req.body && req.body.message) || "";
  const reply = buildReply(message);
  res.json({ message, reply });
});

app.post("/whatsapp", (req, res) => {
  const validate =
    String(process.env.VALIDATE_TWILIO_SIGNATURE || "").toLowerCase() ===
    "true";

  if (validate) {
    const signature = req.headers["x-twilio-signature"];
    const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const valid = twilio.validateRequest(
      process.env.TWILIO_AUTH_TOKEN || "",
      signature,
      url,
      req.body || {}
    );
    if (!valid) {
      return res.status(403).type("text/plain").send("Invalid Twilio signature");
    }
  }

  const message = (req.body && req.body.Body) || "";
  const reply = buildReply(message);

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(reply);
  res.type("text/xml").send(twiml.toString());
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`DW Gold Trading bot listening on http://localhost:${PORT}`);
  });
}

module.exports = { app, buildReply, isRefusal, search };
