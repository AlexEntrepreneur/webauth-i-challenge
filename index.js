const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const PORT = 5000;
const server = express();
const db = knex(knexConfig.development);

server.listen(PORT, () => {
  console.log(`\nServer listening on port ${PORT}...\n`);
});
