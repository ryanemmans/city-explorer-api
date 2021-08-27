const axios = require('axios');

async function weather(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;

  try {
    const weatherKey = process.env.WEATHER_API_KEY;
    const weather_API_URL = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${weatherKey}&lat=${lat}&lon=${lon}&lang=en&days=3&units=I`;

    const weatherAPIRes = await axios.get(weather_API_URL);
    // console.log(weatherAPIRes.data.data);
    const weather = weatherAPIRes.data.data.map(day => new Forecast(day));
    // console.log('LOOK AT ME!!', weather);
    res.send(weather);
  } catch (error) {
    res.status(500).send('No city found.');
  }
}

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.dailyForecast = `High of ${day.high_temp}, Low of ${day.low_temp}, with ${day.weather.description}`;
  }
}

module.exports = weather;
