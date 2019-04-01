const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const PORT = 5000;
const server = express();
const db = knex(knexConfig.development);

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Welcome To My Auth Test API');
});

server.post('/api/register', (req, res) => {
  res.send('hit register endpoint');
});

server.post('/api/login', (req, res) => {
  res.send('hit login endpoint');
});

server.get('/api/users', (req, res) => {
  res.send('You shall not pass!');
});

server.listen(PORT, () => {
  console.log(`\nServer listening on port ${PORT}...\n`);
});
