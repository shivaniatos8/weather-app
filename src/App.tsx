import React, { useState } from 'react';
import WeatherForm from './components/weatherForm';
import WeatherDisplay from './components/weatherDisplay';
import WeatherService from './services/weatherService';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeatherData = async (location: string) => {
    try {
      const data = await WeatherService.getWeather(location);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <WeatherForm onSubmit={fetchWeatherData} />
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
};

export default App;





