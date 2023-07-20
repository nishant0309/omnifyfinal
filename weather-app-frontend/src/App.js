// src/App.js
import React, { useState } from 'react';
import './styles.css';
import { WiDaySunny, WiCloud, WiRain, WiSnow } from 'react-icons/wi';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [locationNotFound, setLocationNotFound] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/weather/${location}`);
      const data = await response.json();
      console.log(data)
      
      if (data.coord && data.coord === '404'||data.coord===undefined) {
        setLocationNotFound(true);
        setWeatherData(null);
      } else {
        setLocationNotFound(false);
        setWeatherData(data);
      }
    } catch (error) {
      
      console.error('Error fetching weather data', error);
    }
  };

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return <WiDaySunny />;
      case '02d':
      case '03d':
      case '04d':
        return <WiCloud />;
      case '09d':
      case '10d':
        return <WiRain />;
      case '13d':
        return <WiSnow />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>

      {locationNotFound && <p>Location not found.</p>}

      {weatherData && !locationNotFound && (
        <div className="weather-info">
          <h2>Weather conditions in {weatherData.name}</h2>
          <div className="weather-box">
            <div className="weather-icon">{getWeatherIcon(weatherData.weather[0].icon)}</div>
            <p className="weather-condition">{kelvinToCelsius(weatherData.main.temp)} °C</p>
            <p className="weather-description">
              {weatherData.weather[0].main} - {weatherData.weather[0].description}
            </p>
          </div>
          <div className="weather-details">
            <div className="humidity">
             
              <div className="text">
                <span id="humidity">{weatherData.main.humidity}%</span>
                <p>Humidity</p>
              </div>
            </div>
            <div className="wind">
              
              <div className="text">
                <span id="wind-speed">{weatherData.wind.speed} km/h</span>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
