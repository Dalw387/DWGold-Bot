import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const dist = path.join(__dirname, "dist");

app.use(express.json({ limit: "32kb" }));
app.use(express.static(dist, { maxAge: "7d", index: false }));

const rules = [
  [/price|cost|£|month|upfront/i, "There is nothing to pay at the start. Engagements begin from £99 a month. A person can set the figure plainly."],
  [/what is kiwi|who are you/i, "Kiwi Vision Media builds digital business systems — websites, AI agents, automation and Kiwi Command. Built by AI. Directed by humans."],
  [/command/i, "Kiwi Command is the operating system for the engagement: projects, approvals, invoices, analytics, AI, support and documents."],
  [/human|person|someone/i, "Ask for a person at any time. Email info@kiwimediagroup.com until a telephone number is confirmed."],
];

app.post("/api/ask", (req, res) => {
  const message = String(req.body?.message || "").slice(0, 2000);
  const hit = rules.find(([re]) => re.test(message));
  res.json({
    reply: hit
      ? hit[1]
      : "I can speak to what Kiwi builds, pricing, and how to begin. For judgement, email info@kiwimediagroup.com.",
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(dist, "index.html"));
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Kiwi Vision Media on ${port}`);
});
