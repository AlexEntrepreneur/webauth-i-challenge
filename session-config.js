const sessionConfig = {
  name: 'auth_test_app',
  secret: '31DD761B2B1F281992FA17AE23D50E1E61A62706',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false
};

module.exports = sessionConfig;
