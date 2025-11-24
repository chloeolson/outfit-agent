import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getOutfitSuggestion(weather) {
  const prompt = `
  The current weather in Copenhagen is ${weather.temp}°C and ${weather.description}.
  Suggest what someone should wear today. Be specific and concise (1-2 short sentences). Do not repeat the weather or description in your suggestion.
  `;

  const response = await client.chat.completions.create({
    model: "gpt-5",
    messages: [{ role: "system", content: "You are a helpful outfit assistant." },
               { role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
