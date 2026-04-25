const express = require('express');
const axios = require('axios');
const router = express.Router();

module.exports = router;

router.get("/weather", async (req, res) => {
  try {
    const lat = req.query.lat || 52.23;
    const lon = req.query.lon || 21.01;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current_weather=true`;

    const response = await axios.get(url);

    const hourly = response.data.hourly;

    const times = hourly.time.slice(0, 24);
    const temps = hourly.temperature_2m.slice(0, 24);

    res.json({
      currentTemp: response.data.current_weather.temperature,
      time: times,
      temperature: temps
    });

  } catch (err) {
    res.status(500).json({ error: "API error" });
  }
});

const path = require("path");

router.get("/temperatura", (req, res) => {
  res.sendFile(path.join(__dirname, "../pogoda.html"));
});