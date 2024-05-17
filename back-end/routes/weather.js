import express from "express";
import fetch from "node-fetch";
const router = express.Router();

// Function to fetch weather data
async function getWeatherData(city) {
  const apiKey = "ec17ac0e8b560338db4131a2b9bc63e2";
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

// Weather Action
router.get("/:city", async (req, res) => {
  const city = req.params.city;
  console.log("weather api :", req.params);
  try {
    const weatherData = await getWeatherData(city);
    res.status(200).send(weatherData);
  } catch (error) {
    res.status(500).send("Error fetching weather data.");
  }
});

export default router;
