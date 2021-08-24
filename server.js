const express = require('express');
const cors = require('cors');

// require('dotenv')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('hello there, world');
});

app.get('/weather', (request, response) => {
  response.send(['Seattle', 'Chicago', 'New York']);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`))