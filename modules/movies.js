const axios = require('axios');

async function movies(req, res) {
  const movieQuery = req.query.searchQuery;
  console.log('MOVIE QUERY???', movieQuery);

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

module.exports = movies;
