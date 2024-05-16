const express = require('express');
const app = express();

//.env
require('dotenv').config();
PORT = process.env.PORT || 3000;

app.use(express.json());

const fetch = require("node-fetch");
// Function to fetch weather data
async function getWeatherData(city) {
  const apiKey = "YOUR_API_KEY";
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
// Example usage
getWeatherData("Mumbai")
  .then((data) => {
    console.log(data); // Display the weather data for Mumbai
  })
  .catch((error) => {
    console.error(error);
  });

// Action
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
console.log(`Running on :  http://localhost:${PORT}`);
});
