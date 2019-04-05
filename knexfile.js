// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/authTest.sqlite3'
    },
    seeds: {
      directory: './database/seeds/'
    },
    migrations: {
      directory: './database/migrations/'
    }
  }

};
