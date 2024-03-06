const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;
const apiKey = '1118cba755efa7ad8e43ee63c6da9e79';

app.get('/weather', async (req, res) => {
  const { location } = req.query;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
