const restrictedRoute = (req, res, next) => {
  const knex = require('knex');
  const knexConfig = require('./knexfile');
  const server = require('express')();
  const Users = knex(knexConfig.development)('users');

  const pathContainsRestricted = req.path.includes('/restricted');
  const clientHasLiveSession = !!req.session.user;
  const endpointPathExists = true; // Looking for a way to check if endpoint is defined

  if (pathContainsRestricted && clientHasLiveSession) {
    next();
  }
  else if (pathContainsRestricted && endpointPathExists) {
    res.status(401).send('You shall not pass! You must authenticate!');
  }
  else {
    next();
  }
}

module.exports = {
  restrictedRoute
};
