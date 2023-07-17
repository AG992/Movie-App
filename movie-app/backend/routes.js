const express = require('express');
// const { default: knex } = require('knex');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const cors = require('cors')
const app = express();
const port = 8080;

app.use(cors())

  // Query all movies in the database
app.get('/movies', (req, res) => {
  knex.select().from('movie_info')
    .then(data => {
      // console.log(data)
      res.send(data);
    })
    .catch(err => console.log(err));

});

  // Add movie to database
app.post('/movies:movie_title', (req, res) => {

})

app.listen(port, () => console.log(
  `Server is running on port: ${port}`
))
