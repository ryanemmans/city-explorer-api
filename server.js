const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// app.get('/', (request, response) => {
//   response.send('hello world');
// });

app.get('/weather', (request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;
  let searchQuery = request.query.cityName;
  const cityObject = weather.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
  const forecast = new Forecast(cityObject);
  response.send([forecast])
  // response.send([lat, lon, searchQuery])
  // console.log('SEARCHQUERY', city);
  // const city = weather.find(city => {
  //   console.log(city.city_name);
  // });

  if (forecast) {
    const weather = forecast.data.map(day => new Forecast(day));
    response.send(weather);
  } else {
    response.status(500).send('No city found.');
    // throw new Error('Invalid');
    // response.status(400).send('No city found.');
  }
});

class Forecast {
  constructor (data) {
  this.date = data(valid_date);
  this.description = data(`Low of ${low_temp}, High of ${high_temp}, with ${weather.description}`);
}}

// function error(err, req, res, next) {
//   console.log(err.stack);
//   res.status(500);
//   res.send({ error: "Something went wrong."});
// }

// app.use(error);

app.listen(PORT, () => console.log(`listening on port ${PORT}`))