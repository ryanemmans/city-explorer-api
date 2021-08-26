'use strict';

const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = `Low of ${day.low_temp}, High of ${day.high_temp}, with ${day.weather.description}`;
  }
}

app.get('/weather', async (req, res) => {
  const latQuery = req.query.lat;
  const lonQuery = req.query.lon;
  const searchQuery = req.query.cityName;
  // const searchQuery = req.query.query;
  const cityObject = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());

  if (cityObject) {
    const weather = cityObject.data.map(day => new Forecast(day));
    res.status(200).send(weather);
  } else {
    try {
      const weatherKey = process.env.WEATHER_API_KEY;
      const weatherAPI_URL = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${weatherKey}&city=${searchQuery}$lat=${latQuery}&lon=${lonQuery}&lang=en&days=3&format=json`;

      const weatherAPIRes = await axios.get(weatherAPI_URL);

      // const weatherArray = weatherAPIRes.data.data.map((day) => new Forecast(day)
      // );

      // res.status(200).send(weatherArray);
    } catch (error) {
      res.status(500).send('No city found.');
    }
  }
});



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
