import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
const router = express.Router();

// Load Environment
dotenv.config();

// Use Environment
const TOKEN = process.env.TOKEN;

async function getPM2_5(city_pm25) {
    const token = TOKEN;
  const pm2_5Url = `https://api.waqi.info/feed/${city_pm25}/?token=${token}`;
  try {
    const response = await fetch(pm2_5Url);
    
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Try to parse the response as JSON
    try {
      const getPm2_5 = await response.json();
      return getPm2_5;
    } catch (jsonError) {
      throw new Error('Failed to parse JSON response');
    }
  } catch (error) {
    console.log("Error fetching pm2.5 api data:", error.message);
    throw error;
  }
}

// Action
router.get("/:city_pm25", async (req, res) => {
    const city_pm25 = req.params.city_pm25;
    console.log("pm25 api :", req.params);
  try {
    const pm2_5Data = await getPM2_5(city_pm25);
    res.status(200).send(pm2_5Data);
  } catch (error) {
    console.error("Error /pm2.5 route:", error.message);
    res.status(500).send({ error: "Error fetching pm2.5 data." });
  }
});
export default router;
