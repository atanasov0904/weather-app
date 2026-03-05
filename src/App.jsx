import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const interpretWeatherCode = (code) => {
    const weatherCodes = {
      0: "Clear sky ☀️",
      1: "Mainly clear 🌤️",
      2: "Partly cloudy ⛅",
      3: "Overcast ☁️",
      45: "Fog 🌫️",
      48: "Depositing rime fog 🌫️",
      51: "Light drizzle 🌧️",
      53: "Moderate drizzle 🌧️",
      55: "Dense drizzle 🌧️",
      56: "Light freezing drizzle ❄️",
      57: "Dense freezing drizzle ❄️",
      61: "Slight rain 🌧️",
      63: "Moderate rain 🌧️",
      65: "Heavy rain 🌧️",
      66: "Light freezing rain ❄️",
      67: "Heavy freezing rain ❄️",
      71: "Slight snow fall ❄️",
      73: "Moderate snow fall ❄️",
      75: "Heavy snow fall ❄️",
      77: "Snow grains ❄️",
      80: "Slight rain showers 🌦️",
      81: "Moderate rain showers 🌦️",
      82: "Violent rain showers 🌧️",
      85: "Slight snow showers ❄️",
      86: "Heavy snow showers ❄️",
      95: "Thunderstorm ⛈️",
      96: "Thunderstorm with slight hail ⛈️",
      99: "Thunderstorm with heavy hail ⛈️",
    };

    return weatherCodes[code] || "Unknown weather";
  };

  const getBackgroundStyles = (code) => {
    if (code === 0 || code === 1) {
      return {
        background: "radial-gradient(circle at top right, #3b82f6, transparent), radial-gradient(circle at bottom left, #8b5cf6, transparent)",
      };
    } else if (code >= 2 && code <= 3) {
      return {
        background: "radial-gradient(circle at top right, #64748b, transparent), radial-gradient(circle at bottom left, #475569, transparent)",
      };
    } else if (code >= 45 && code <= 48) {
      return {
        background: "radial-gradient(circle at top right, #94a3b8, transparent), radial-gradient(circle at bottom left, #64748b, transparent)",
      };
    } else if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
      return {
        background: "radial-gradient(circle at top right, #3b82f6, transparent), radial-gradient(circle at bottom left, #8b5cf6, transparent)",
      };
    } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
      return {
        background: "radial-gradient(circle at top right, #94a3b8, transparent), radial-gradient(circle at bottom left, #64748b, transparent)",
      };
    } else if (code >= 95 && code <= 99) {
      return {
        background: "radial-gradient(circle at top right, #ef4444, transparent), radial-gradient(circle at bottom left, #b91c1c, transparent)",
      };
    } else {
      return {
        background: "radial-gradient(circle at top right, #3b82f6, transparent), radial-gradient(circle at bottom left, #8b5cf6, transparent)",
      };
    }
  }

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=42.6975&longitude=23.3241&current=temperature_2m,weather_code";
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data.current);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div 
      className="App" 
      style={{ background: weather ? getBackgroundStyles(weather.weather_code) : "#1e3a8a" }}
    >
      <div className="weather-container">
        <div className="weather-card">
          <h1 className="city-name">Sofia, Bulgaria</h1>
          {weather != null ? (
            <>
              <div className="temp-display">
                <span className="temp-number">{weather.temperature_2m}</span>
                <span className="temp-unit">°C</span>
              </div>
              <p className="description">
                {interpretWeatherCode(weather.weather_code)}
              </p>
              <button 
  className={`refresh-btn ${loading ? 'loading' : ''}`} 
  onClick={fetchWeather}
  disabled={loading}
>
  <svg
  className="refresh-icon"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M23 4v6h-6" />
  <path d="M1 20v-6h6" />
  <path d="M3.51 9a9 9 0 0114.13-3.36L23 10" />
  <path d="M20.49 15a9 9 0 01-14.13 3.36L1 14" />
</svg>
</button>
            </>
          ) : (
            <div className="loader">Loading...</div>
          )}
        </div>
        <p className="read-the-docs">Data provided by Open-Meteo API</p>
      </div>
    </div>
  );
}

export default App;
