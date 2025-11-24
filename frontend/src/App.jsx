import { useState, useEffect } from 'react'
import './App.css'
import { fetchOutfit } from "./api";

function App() {
    const [data, setData] = useState(null);

  useEffect(() => {
    fetchOutfit().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;


  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4 ">🧣 What to Wear in Copenhagen</h1>
      <p className="text-lg mb-2" >
        Current weather: {data.weather.temp}°C, {data.weather.description}
      </p>
      <p className="text-xl font-medium" >{data.suggestion}</p>
    </div>
    </>
  )
}

export default App
