'use strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
// const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  // const searchQuery = req.query.query;
  // const cityObject = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());

  // if (cityObject) {
  //   res.status(200).send(weather);
  // } else {
  try {
    const weatherKey = process.env.WEATHER_API_KEY;
    const weather_API_URL = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${weatherKey}&lat=${lat}&lon=${lon}&lang=en&days=3&units=I`;

    const weatherAPIRes = await axios.get(weather_API_URL);
    console.log(weatherAPIRes.data.data);
    const weather = weatherAPIRes.data.data.map(day => new Forecast(day));
    console.log('LOOK AT ME!!', weather);
    res.send(weather);

    // const weatherArray = weatherAPIRes.data.data.map((day) => new Forecast(day)
    // );

    // res.status(200).send(weatherArray);
  } catch (error) {
    res.status(500).send('No city found.');
  }
})
// });

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.dailyForecast = `High of ${day.high_temp}, Low of ${day.low_temp}, with ${day.weather.description}`;
  }
}

// function error(err, req, res, next) {
//   res.status(500);
//   res.send({ error: "Something went wrong." });
// }

// app.use(error);

// else if (cityObject.city_name !== searchQuery) {
//   res.status(400).send('No city found.');
// } else {
//   res.status(500).send('Internal server error.');
// };
// });

app.listen(PORT, () => console.log(`listening on port ${PORT}`))

// ---------------------- UNUSED CODE ---------------------- //

// app.get('/', (req, res) => {
//   response.send('hello world');
// });

// const forecast = new Forecast(cityObject);
  // res.send([forecast])
  // res.send([lat, lon, searchQuery])
  // const city = weather.find(city => {
  // });
