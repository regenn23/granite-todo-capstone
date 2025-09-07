import express from "express";
import Replicate from "replicate";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === AI Helper API dulu ===
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt kosong" });

    console.log("📨 Prompt:", prompt);

    let output = "";
    for await (const event of replicate.stream("ibm-granite/granite-3.3-8b-instruct", {
      input: { prompt }
    })) {
      output += event;
    }

    res.json({ output });
  } catch (err) {
    console.error("❌ Error Granite:", err);
    res.status(500).json({ error: err.message });
  }
});

// === Baru frontend ===
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server jalan di http://localhost:${PORT}`));
