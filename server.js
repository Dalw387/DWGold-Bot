# DW Gold Trading WhatsApp Bot

Node.js WhatsApp education bot for Twilio + Railway.

## What this bot does
- Answers beginner gold trading education questions from markdown files.
- Searches the knowledge folder before replying.
- Refuses trading signals, financial advice, investment advice, buy/sell recommendations, and market predictions.
- Adds the required disclaimer to every reply.

## Files
- server.js
- package.json
- .env.example
- knowledge/knowledge_base.md
- knowledge/faq.md
- knowledge/beginner_questions.md
- knowledge/glossary.md
- knowledge/abbreviations.md

## Run locally
```bash
npm install
npm start
```

Visit:
```text
http://localhost:3000/
```

Test with JSON:
```bash
curl -X POST http://localhost:3000/test \
  -H "Content-Type: application/json" \
  -d '{"message":"What is a stop loss?"}'
```

## Railway
1. Create a new GitHub repo.
2. Drag and drop all files from this package into the repo.
3. Connect the repo to Railway.
4. Railway should run `npm start` automatically.
5. Copy the Railway public URL.

## Twilio WhatsApp Sandbox webhook
In Twilio, set **When a message comes in** to:
```text
https://YOUR-RAILWAY-URL/whatsapp
```

Method:
```text
POST
```

## First WhatsApp tests
Send:
```text
What is a stop loss?
```

Then test refusal:
```text
Should I buy gold now?
```

The refusal should say:
```text
DW Gold Trading provides education only. We do not provide trading signals, financial advice, investment advice, or market predictions.
```
