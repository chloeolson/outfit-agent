import fetch from "node-fetch";

export async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Copenhagen&appid=${process.env.WEATHER_API_KEY}&units=metric`
  );
  const data = await response.json();
  return {
    temp: data.main.temp,
    description: data.weather[0].description,
  };
}