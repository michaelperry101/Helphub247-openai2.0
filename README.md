# Helphub247 v8 (OpenAI functional)

This demo is wired to call OpenAI if you set environment variables:
- OPENAI_API_KEY (required to enable live AI)
- OPENAI_MODEL (optional, default: gpt-5)

APIs:
- POST /api/chat with { messages: [...] } -> returns { reply }
- POST /api/image with { prompt } -> returns { imageBase64 }
- POST /api/audio with { text } -> returns { ok:true } (stub)

Deploy notes:
- Add OPENAI_API_KEY in Vercel environment variables (recommended).

Local:
- npm install
- add .env.local with OPENAI_API_KEY and OPENAI_MODEL
- npm run dev
