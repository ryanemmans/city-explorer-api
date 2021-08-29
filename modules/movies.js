// -------------------- STARTER CODE -------------------- //

'use strict';

const axios = require('axios');
const cache = require('./cache.js');

async function movies(req, res) {
  const movieQuery = req.query.searchQuery;
  const moviesKey = process.env.MOVIE_API_KEY;
  const movies_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${moviesKey}&query=${movieQuery}&language=en-US`;

  if (cache[moviesQuery] && (Date.now() - cache[moviesQuery].timestamp < 36500)) {
    console.log('Cache hit');
    res.send(cache[moviesQuery]);
    // return;

  } else {
    console.log('Cache miss');
    cache[moviesQuery] = {};
    cache[moviesQuery].timestamp = Date.now();
    cache[moviesQuery].results = await axios.get(movies_API_URL)
      .then(res => parseMovies(res.body));
    return cache[moviesQuery].data;
  }

  function parseMovies(movieData) {
    try {
      const movieSummaries = movieData.results.map(obj => {
        return new Films(obj);
      });
      cache[moviesQuery];
      res.status(200).send(movieSummaries);
      return Promise.resolve(movieSummaries);
    } catch (err) {
      console.log('error', err);
      res.status(500).send('error', err);
      return Promise.reject(err);
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
}

module.exports = movies;

// ------------------------------------------------------ //







// const axios = require('axios');

// async function movies(req, res) {
//   const movieQuery = req.query.searchQuery;

//   try {
//     const moviesKey = process.env.MOVIE_API_KEY;
//     const movies_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${moviesKey}&query=${movieQuery}&language=en-US`;

//     const moviesAPIRes = await axios.get(movies_API_URL);
//     const movies = moviesAPIRes.data.results.map(obj => new Films(obj));
//     res.send(movies);
//   } catch (error) {
//     res.status(500).send('No movies found.');
//   }
// }

// class Films {
//   constructor(obj) {
//     this.title = obj.title;
//     this.overview = `Overview: ${obj.overview}`;
//     this.vote_average = `Average vote: ${obj.vote_average}`;
//     this.vote_count = `Total Votes: ${obj.vote_count}`;
//     this.poster_path = obj.poster_path;
//     this.popularity = `Popularity: ${obj.popularity}`;
//     this.release_date = `Release date: ${obj.release_date}`;
//   }
// }

// module.exports = movies;
