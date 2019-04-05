// Import Third Party Code
const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex');
const session = require('express-session');

// Import External Code
const knexConfig = require('./knexfile');
const middleware = require('./middleware');
const sessionConfig = require('./session-config');

const PORT = 5000;
const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(session(sessionConfig));
server.use(middleware.restrictedRoute);

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

  db('users').where({ username }).first()
    .then(userObj => {
      if (userObj) {
        user = userObj;
        return user;
      }
      else {
        throw 'Bad credentials. Try again.';
      }
    })
    .then(userObj => {
      const passwordIsCorrect = bcrypt.compareSync(password, userObj.password);
      if (passwordIsCorrect) {
        req.session.user = userObj;
        res.json({
          message: `Welcome ${userObj.username}`
        });
      }
      else {
        throw 'Bad credentials. Try again.';
      }
    })
    .catch(err => {
      res.status(401).json({
        message: err
      })
    })
    .catch(err => {
      res.status(500).json({
        message: `failed to get users ${err}`
      });
    })
});

server.get('/api/logout', (req, res) => {
    req.session.destroy();
    res.end();
});

server.get('/api/restricted/users', (req, res) => {
  db('users').select('username')
  .then(usersArray => {
    res.json(usersArray);
  })
  .catch(err => {
    res.status(500).json({
      message: `failed to get users ${err}`
    });
  });
});

server.listen(PORT, () => {
  console.log(`\nServer listening on port ${PORT}...\n`);
});
