import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const cities = {
    sofia: { name: "Sofia, Bulgaria", lat: 42.6975, lon: 23.3241 },
    plovdiv: { name: "Plovdiv, Bulgaria", lat: 42.1354, lon: 24.7453 },
    varna: { name: "Varna, Bulgaria", lat: 43.2141, lon: 27.9147 },
    burgas: { name: "Burgas, Bulgaria", lat: 42.5048, lon: 27.4626 },
    ruse: { name: "Ruse, Bulgaria", lat: 43.8563, lon: 25.9708 },
    staraZagora: { name: "Stara Zagora, Bulgaria", lat: 42.4244, lon: 25.6345 },
    pleven: { name: "Pleven, Bulgaria", lat: 43.4176, lon: 24.6065 },
    velikoTarnovo: { name: "Veliko Tarnovo, Bulgaria", lat: 43.0757, lon: 25.6172 },
  };

  const [cityKey, setCityKey] = useState("sofia");
  const city = cities[cityKey];

  const [weather, setWeather] = useState(null);
  const [weekly, setWeekly] = useState(null);
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

  const getWeatherIcon = (code) => {
    const icons = {
      0: "☀️",
      1: "🌤️",
      2: "⛅",
      3: "☁️",
      45: "🌫️",
      48: "🌫️",
      51: "🌧️",
      53: "🌧️",
      55: "🌧️",
      56: "❄️",
      57: "❄️",
      61: "🌧️",
      63: "🌧️",
      65: "🌧️",
      66: "❄️",
      67: "❄️",
      71: "❄️",
      73: "❄️",
      75: "❄️",
      77: "❄️",
      80: "🌦️",
      81: "🌦️",
      82: "🌧️",
      85: "❄️",
      86: "❄️",
      95: "⛈️",
      96: "⛈️",
      99: "⛈️",
    };
    return icons[code] || "❓";
  };

  const getBackgroundStyles = (code) => {
    if (code === 0) {
      return "linear-gradient(to top,rgb(135, 172, 235),rgb(254, 249, 189))";
    } else if (code === 1) {
      return "linear-gradient(to top,rgb(160, 220, 255),rgb(255, 235, 175))";
    } else if (code === 2 || code === 3) {
      return "linear-gradient(to top,rgb(144, 164, 174),rgb(207, 214, 220))";
    } else if (code >= 45 && code <= 48) {
      return "linear-gradient(to top,rgb(176, 190, 197),rgb(236, 239, 241))";
    } else if (
      (code >= 51 && code <= 57) ||
      (code >= 61 && code <= 67) ||
      (code >= 80 && code <= 82)
    ) {
      return "linear-gradient(to top,rgb(79, 117, 161),rgb(126, 155, 196))";
    } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
      return "linear-gradient(to top,rgba(224, 244, 250, 0.8),rgba(168, 186, 255, 0.83))";
    } else if (code >= 95 && code <= 99) {
      return "linear-gradient(to top,rgb(55, 55, 55),rgb(97, 97, 97))";
    } else {
      return "linear-gradient(to top,rgb(59, 131, 246),rgb(138, 92, 246))";
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&daily=temperature_2m_max,weathercode&timezone=Europe%2FSofia`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data.current_weather);
      setWeekly(data.daily);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [cityKey]);

  return (
    <div
      className="App"
      style={{
        background: weather
          ? getBackgroundStyles(weather.weathercode)
          : "#1e3a8a",
      }}
    >
      <div className="weather-container">
        <div className="top-bar">
          <div className="headliner">
            <h1>Weather</h1>
          </div>
          <button
            className={`refresh-btn ${loading ? "loading" : ""}`}
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
        </div>

        <div className="city-selector">
          <select value={cityKey} onChange={(e) => setCityKey(e.target.value)}>
            {Object.entries(cities).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {weather ? (
          <>
            <div className="temp-display">
              <span className="temp-number">{weather.temperature}</span>
              <span className="temp-unit">°C</span>
            </div>
            <p className="description">
              {interpretWeatherCode(weather.weathercode)}
            </p>

            {weekly && (
              <div className="weekly-forecast">
                {weekly.time.slice(1, 7).map((date, i) => (
                  <div className="forecast-row" key={date}>
                    <span className="forecast-day">
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </span>
                    <span className="forecast-icon">
                      {getWeatherIcon(weekly.weathercode[i + 1])}
                    </span>
                    <span className="forecast-temp">
                      {Math.round(weekly.temperature_2m_max[i + 1])}°C
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="loader">Loading...</div>
        )}

        <p className="read-the-docs">Data provided by Open-Meteo API</p>
      </div>
    </div>
  );
}

export default App;
