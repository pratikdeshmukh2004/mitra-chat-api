const Dotenv = require("dotenv").config();
const { DB_NAME, DB_USER, DB_PASS,} = process.env;
// console.log(process.env);

// DB_NAME = 'mitrachat'
// DB_USER = 'postgres' 
// DB_PASS = 'stone'
// SEC_KEY = 'IAMSICRATE'

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: DB_NAME,
      user:     DB_USER,
      password: DB_PASS
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
