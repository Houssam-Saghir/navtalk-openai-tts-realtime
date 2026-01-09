// server.js
// OpenAI TTS streaming proxy (keeps your OpenAI key off the browser)

import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Streams raw PCM audio from OpenAI TTS to the browser.
 * Browser forwards PCM bytes to NavTalk in near real-time.
 */
app.post("/tts", async (req, res) => {
  try {
    const { text, voice = "marin", model = "gpt-4o-mini-tts" } = req.body || {};
    const audio = await openai.audio.speech.create({
      model,
      voice,
      input: text,
      response_format: "pcm",
    });

    // audio is a Response-like object; convert to ArrayBuffer
    const buf = Buffer.from(await audio.arrayBuffer());
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(buf);
  } catch (err) {
    console.error("TTS ERROR:", err);
    res.status(500).json({
      error: "tts_failed",
      message: err?.message,
      status: err?.status,
      code: err?.code,
      type: err?.type,
    });
  }
});

const port = process.env.PORT || 5179;
app.listen(port, () => {
  console.log(`TTS proxy running on http://localhost:${port}`);
  console.log("Set OPENAI_API_KEY in your environment.");
});
