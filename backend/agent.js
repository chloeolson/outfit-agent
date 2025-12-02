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
  Suggest what someone should wear today. Be specific and concise (1-2 short sentences). Do not repeat the weather or description in your suggestion.`

  const response = await client.chat.completions.create({
    model: "gpt-5",
    messages: [{ role: "system", content: "You are a helpful outfit assistant." },
               { role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

export async function getClothesSuggestion(weather) {
  const outfitprompt = `
  The current weather in Copenhagen is ${weather.temp}°C and ${weather.description}.
  Return a JSON of three clothing items chosen from these options only:  baseball_cap,
    pants, jacket, jeans, puffer_jacket, rainjacket, scarf, shorts, skipants,sweater, tshirt, tanktop, winterhat.
  An example of a good answer: ["jacket", "scarf", "jeans"]
`
  const outfitresponse = await client.chat.completions.create({
    model: "gpt-5",
    messages: [{ role: "system", content: "You are a helpful outfit assistant." },
               { role: "user", content: outfitprompt }],
  });

  let content = outfitresponse.choices[0].message.content;

  try {
    const parsed = JSON.parse(content);
    return parsed; 
  } catch (err) {
    console.log("❗ Could not parse AI response:", content);
    return []; 
  }
}
