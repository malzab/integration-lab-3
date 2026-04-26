const express = require('express');
const axios = require('axios');
const router = express.Router();

module.exports = router;

//Open-Meteo API

router.get("/weather", async (req, res) => {
  try {
    const lat = req.query.lat || 54.52;
    const lon = req.query.lon || 18.53;

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

//JSONPlaceholder API

router.get("/posty", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

    const posts = response.data;

    const userPosts = posts.filter(p => p.userId === 1);

    const stats = {
      userId: 1,
      count: userPosts.length,
      avgTitleLength:
        userPosts.reduce((sum, p) => sum + p.title.length, 0) / userPosts.length
    };

    res.json({
      stats,
      posts: userPosts.slice(0, 10)
    });

  } catch (err) {
    res.status(500).json({ error: "Posts API error" });
  }
});

router.get("/postystrona", (req, res) => {
  res.sendFile(path.join(__dirname, "../posty.html"));
});

router.get("/podsumowanie", async (req, res) => {
  try {
    const lat = req.query.lat || 54.52;
    const lon = req.query.lon || 18.53;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;

    const response = await axios.get(url);

    const temps = response.data.hourly.temperature_2m.slice(0, 24);

    const sum = temps.reduce((a, b) => a + b, 0);
    const avg = sum / temps.length;

    const min = Math.min(...temps);
    const max = Math.max(...temps);

    res.json({
      srednia_temperatura: avg.toFixed(2),
    });

  } catch (err) {
    res.status(500).json({ error: "Error podsumowania" });
  }
});