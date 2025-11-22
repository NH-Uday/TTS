const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const modeSettings = {
  motivating: {
    // Louder, faster, slightly higher pitch.
    stability: 0.95,
    similarity_boost: 0.9,
    style: 0.05,
    use_speaker_boost: true,
    speed: 1.2,
    voiceId:
      process.env.ELEVENLABS_VOICE_ID ||
      process.env.ELEVENLABS_VOICE_ID
  },

  calming: {
    // Softer, slower, lower pitch
    stability: 0.85,
    similarity_boost: 0.75,
    style: 0.15,
    use_speaker_boost: false,
    speed: 0.8,
    voiceId:
      process.env.ELEVENLABS_VOICE_ID ||
      process.env.ELEVENLABS_VOICE_ID
  }
};

const ELEVEN_TTS_URL = (voiceId) =>
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

app.post("/api/tts", async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing text" });
    }

    const config = modeSettings[mode] || modeSettings.motivating;

    const response = await fetch(
      ELEVEN_TTS_URL(config.voiceId),
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: config.stability,
            similarity_boost: config.similarity_boost,
            style: config.style,
            use_speaker_boost: config.use_speaker_boost,
            speed: config.speed
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("ElevenLabs error:", errText);
      return res.status(500).json({ error: "ElevenLabs TTS failed" });
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
