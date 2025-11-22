const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Mode 
const modeSettings = {
  motivating: {
    speed: 1.25, 
    instructions:
      "Speak like a loud, fast, high-energy football coach, very motivating and pumped up."
  },
  calming: {
    speed: 0.85, 
    instructions:
      "Speak softly and slowly, with a calm, reassuring, low-energy tone like a relaxing coach."
  }
};

// OpenAI TTS endpoint
const OPENAI_TTS_URL = "https://api.openai.com/v1/audio/speech";

app.post("/api/tts", async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing text" });
    }

    const cfg = modeSettings[mode] || modeSettings.motivating;

    const model = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";
    const voice = process.env.OPENAI_TTS_VOICE || "alloy";

    const response = await fetch(OPENAI_TTS_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        voice,
        input: text,
        speed: cfg.speed,
        instructions: cfg.instructions,
        format: "mp3"
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI TTS error:", errText);
      return res.status(500).json({ error: "OpenAI TTS failed" });
    }

    const audioBuffer = await response.arrayBuffer();
    const audioBytes = Buffer.from(audioBuffer);

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(audioBytes);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
