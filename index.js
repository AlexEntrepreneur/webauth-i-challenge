const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex');
const knexConfig = require('./knexfile');
const PORT = 5000;
const server = express();
const db = knex(knexConfig.development);
const fakeToken = Buffer.from(Math.random() + '').toString('base64');

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Welcome To My Auth Test API');
});

server.post('/api/register', (req, res) => {
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 7);

  password = hash;

  db('users').insert({ username, password })
    .then(value => {
      res.send('Added User!');
    })
    .catch(err => {
      res.status(500).json({
        message: `failed to create user ${err}`
      });
    });
});

server.post('/api/login', (req, res) => {
  let user;
  let { username, password } = req.body;

  db('users').select('*').where('username', username).first()
    .then(userObj => {
      if (userObj) {
        user = userObj;
        return user;
      }
      else {
        throw '';
      }
    })
    .then(userObj => {
      const passwordIsCorrect = bcrypt.compareSync(password, userObj.password);
      if (passwordIsCorrect) {
        res.json({
          token: fakeToken
        });
      }
      else {
        throw '';
      }
    })
    .catch(err => {
      res.status(401).json({
        message: `Bad credentials. Try again.`
      })
    })
    .catch(err => {
      res.status(500).json({
        message: `failed to get users ${err}`
      });
    })
});

server.get('/api/users', (req, res) => {
  const { authorization } = req.headers;
  if (authorization === fakeToken) {
    db('users').select('username')
    .then(usersArray => {
      res.json(usersArray);
    })
    .catch(err => {
      res.status(500).json({
        message: `failed to get users ${err}`
      });
    });
  }
  else {
    res.status(401).send('You shall not pass! You must authenticate!');
  }
});

server.listen(PORT, () => {
  console.log(`\nServer listening on port ${PORT}...\n`);
});
