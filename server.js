const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('hello world');
});

app.get('/weather', (request, response) => {
  let searchQuery = request.query.cityName;
  // console.log('SEARCHQUERY', searchQuery);
  const city = weather.find(city => city.city_name === searchQuery);
  // console.log('SEARCHQUERY', city);
  // const city = weather.find(city => {
  //   console.log(city.city_name);
  // });

  if (city) {
    const weather = city.data.map(day => new Forecast(day));
    response.send(weather);
  } else {
    response.send('No city found.');
    // throw new Error('Invalid');
    // response.status(400).send('No city found.');
  }
});

function Forecast(day) {
  this.date = day.valid_date;
  this.description = `Low of ${day.low_temp}, High of ${day.high_temp}, with ${day.weather.description}`;
}

function error(err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.send({ error: "Something went wrong."});
}

app.use(error);

app.listen(PORT, () => console.log(`listening on port ${PORT}`))