import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getOutfitSuggestion(weather) {
  const prompt = `
  The current weather in Copenhagen is ${weather.temp}°C and ${weather.description}.
  Suggest what someone should wear today. Be specific and concise (1-2 sentences).
  `;

  const response = await client.chat.completions.create({
    model: "gpt-5-turbo",
    messages: [{ role: "system", content: "You are a helpful outfit assistant." },
               { role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
