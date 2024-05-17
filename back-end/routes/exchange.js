import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv"
const router = express.Router();

// Load Environment
dotenv.config();

// Use Environment
const API_KEY = process.env.CURRENCY_KEY;

// Currency Exchange
async function getExchange(currency) {
  const apiKey = API_KEY;
  const exchangeUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`;

  try {
    const response = await fetch(exchangeUrl);
    const currencyData = await response.json();
    return currencyData;
  } catch (error) {
    console.log("Error fetching currency data:", error);
    throw error;
  }
}

// Currency Action
router.get("/:currency", async (req, res) => {
  const currency = req.params.currency;
  console.log("exchange api :",req.params);
  try {
    const currencyrData = await getExchange(currency);
    res.status(200).send(currencyrData);
  } catch (error) {
    res.status(500).send("Error fetching currency data.");
  }
});

export default router;
