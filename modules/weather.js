// -------------------- STARTER CODE -------------------- //

'use strict';

const axios = require('axios');
const cache = require('./cache.js');

async function weather(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const weatherKey = process.env.WEATHER_API_KEY;
  const weather_API_URL = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${weatherKey}&lat=${lat}&lon=${lon}&lang=en&days=3&units=I`;

  if (cache[lat, lon] && (Date.now() - cache[lat, lon].timestamp < 7)) {
    console.log('Cache hit');
    res.send(cache[lat, lon]);
    // return;

  } else {
    console.log('Cache miss');
    cache[lat, lon] = {};
    cache[lat, lon].timestamp = Date.now();
    cache[lat, lon].data = await axios.get(weather_API_URL)
      .then(res => parseWeather(res.body));
    return cache[lat, lon].data;
  }

  function parseWeather(forecastData) {
    try {
      const weatherSummaries = forecastData.data.map(day => {
        return new Forecast(day);
      });
      cache[lat, lon];
      res.status(200).send(weatherSummaries);
      return Promise.resolve(weatherSummaries);
    } catch (err) {
      console.log('error', err);
      res.status(500).send('error', err);
      return Promise.reject(err);
    }
  }

  class Forecast {
    constructor(day) {
      this.time = day.datetime;
      this.dailyForecast = `High of ${day.high_temp}, Low of ${day.low_temp}, with ${day.weather.description}`;
    }
  }
}

module.exports = weather;

// ------------------------------------------------------ //







// const axios = require('axios');

// async function weather(req, res) {
//   const lat = req.query.lat;
//   const lon = req.query.lon;

//   try {
//     const weatherKey = process.env.WEATHER_API_KEY;
//     const weather_API_URL = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${weatherKey}&lat=${lat}&lon=${lon}&lang=en&days=3&units=I`;

//     const weatherAPIRes = await axios.get(weather_API_URL);
//     // console.log(weatherAPIRes.data.data);
//     const weather = weatherAPIRes.data.data.map(day => new Forecast(day));
//     // console.log('LOOK AT ME!!', weather);
//     res.send(weather);
//   } catch (error) {
//     res.status(500).send('No city found.');
//   }
// }

// class Forecast {
//   constructor(day) {
//     this.date = day.datetime;
//     this.dailyForecast = `High of ${day.high_temp}, Low of ${day.low_temp}, with ${day.weather.description}`;
//   }
// }

// module.exports = weather;
