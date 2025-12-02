import { useState, useEffect } from 'react'
import './App.css'
import { fetchOutfit } from "./api";

function App() {
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchOutfit().then(outfitData => {
      setData(outfitData);
      setImages(outfitData.images || []);
    });
  }, []);

  if (!data) return <div>OOTD coming right up...</div>;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold mb-4 ">🧣 What to Wear in Copenhagen</h1>
        <p className="text-lg mb-2" >
          Current weather: {data.weather.temp}°C, {data.weather.description}
        </p>
        <p className="text-xl font-medium" >{data.suggestion}</p>
       
        <div className="flex flex-row space-x-10 mt-4 justify-center items-center">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="clothing item"
              className= "h-16 w-16 object-contain"
            
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
