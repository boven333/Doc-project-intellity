import express from "express";
import fetch from "node-fetch";
const router = express.Router();

// Currency Exchange
async function getExchange(currency) {
  const apiKey = "34e36d2cdf90435f368b6fb1";
  const fromCurrency = { value: currency }; // Example currency
  const exchangeUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;

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
