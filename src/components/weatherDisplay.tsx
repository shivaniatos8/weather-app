import React from 'react';

interface WeatherDisplayProps {
  weatherData: any; 
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  return (
    <div>
      <h2>Weather Information</h2>
      <p>Location: {weatherData.name}</p>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Description: {weatherData.weather[0].description}</p>
    </div>
  );
};

export default WeatherDisplay;
