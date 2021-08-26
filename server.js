const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  let searchQuery = req.query.cityName;
  const cityObject = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());

  if (cityObject) {
    const weather = cityObject.data.map(day => new Forecast(day));
    res.status(200).send(weather);
  } else if (cityObject.city_name !== searchQuery) {
    res.status(400).send('No city found.');
  } else {
    res.status(500).send('Internal server error.');
  };
});

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = `Low of ${day.low_temp}, High of ${day.high_temp}, with ${day.weather.description}`;
  }
}

function error(err, req, res, next) {
  res.status(500);
  res.send({ error: "Something went wrong." });
}

app.use(error);

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
