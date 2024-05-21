import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import axios from 'axios';

// use express router
const router = express.Router();

// Load Environment
dotenv.config();

// Use Environment
const API_KEY = process.env.WEATHER_KEY;

const regions = {
    north: ['Chiang Mai', 'Chiang Rai', 'Lamphun', 'Lampang'],
    northeast: ['Khon Kaen', 'Udon Thani', 'Nakhon Ratchasima', 'Ubon Ratchathani'],
    central: ['Bangkok', 'Nonthaburi', 'Pathum Thani', 'Ayutthaya'],
    south: ['Phuket', 'Surat Thani', 'Krabi', 'Songkhla']
};

// Function to fetch weather data
async function getWeatherData(city) {
    const apiKey = API_KEY;
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
    try {
      const response = await fetch(weatherURL);
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.log("Error fetching weather data:", error);
      throw error;
    }
  }

router.get('/api/weather', async (req, res) => {
    
});

export default router;