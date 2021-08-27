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
})

app.get('/movies', async (req, res) => {
  const movieQuery = req.query.movieQuery;
  console.log(movieQuery);

  try {
    const moviesKey = process.env.MOVIE_API_KEY;
    const movies_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${moviesKey}&query=${movieQuery}&language=en-US`;

    const moviesAPIRes = await axios.get(movies_API_URL);
    console.log('MOOOOVIIIEEEE DAAATTAAAAA', moviesAPIRes.data.results);
    const movies = moviesAPIRes.data.results.map(obj => new Films(obj));
    console.log('LOOK AT ME!!', movies);
    res.send(movies);
  } catch (error) {
    res.status(500).send('No movies found.');
  }
})

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.dailyForecast = `High of ${day.high_temp}, Low of ${day.low_temp}, with ${day.weather.description}`;
  }
}

class Films {
  constructor(obj) {
    this.title = obj.title;
    this.overview = `Overview: ${obj.overview}`;
    this.vote_average = `Average vote: ${obj.vote_average}`;
    this.vote_count = `Total Votes: ${obj.vote_count}`;
    this.poster_path = obj.poster_path;
    this.popularity = `Popularity: ${obj.popularity}`;
    this.release_date = `Release date: ${obj.release_date}`;
  }
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`))



// ---------------------- UNUSED CODE ---------------------- //

// const searchQuery = req.query.query;
  // const cityObject = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());

  // if (cityObject) {
  //   res.status(200).send(weather);
  // } else {

// const weatherArray = weatherAPIRes.data.data.map((day) => new Forecast(day)
    // );

    // res.status(200).send(weatherArray);

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

// app.get('/', (req, res) => {
//   response.send('hello world');
// });

// const forecast = new Forecast(cityObject);
  // res.send([forecast])
  // res.send([lat, lon, searchQuery])
  // const city = weather.find(city => {
  // });
