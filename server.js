'use strict';

const express = require('express');
const cors = require('cors');
const weather = require('./modules/weather');
const movies = require('./modules/movies');
require('dotenv').config();
// const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', weather);
app.get('/movies', movies);

app.listen(PORT, () => console.log(`listening on port ${PORT}`))

// -------------- STARTER CODE (WORKED ON ) -------------- //

// function weatherHandler(req, res) {
//   const { lat, lon } = req.query;
//   weather(lat, lon)
//   .then(summaries => res.send(summaries))
//   .catch((error) => {
//     console.error(error);
//     res.status(500).send('Sorry. Something went wrong!')
//   });
// }  

// ------------------------------------------------------ //









// -------------------- UNUSED CODE --------------------- //

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
