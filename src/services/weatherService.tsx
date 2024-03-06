import axios from 'axios';

class WeatherService {
  static async getWeather(location: string): Promise<any> {
    try {
      const response = await axios.get(`/weather?location=${location}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
}

export default WeatherService;
