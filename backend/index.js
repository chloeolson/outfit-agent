import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getWeather } from "./weather.js";
import { getOutfitSuggestion } from "./agent.js";

dotenv.config();
const app = express();
app.use(cors());

app.get("/api/outfit", async (req, res) => {
  try {
    const weather = await getWeather();
    const suggestion = await getOutfitSuggestion(weather);
    res.json({ weather, suggestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate suggestion" });
  }
});

app.listen(3001, () => console.log("✅ Backend running on http://localhost:3001"));
