const { DB_NAME, DB_USER, DB_PASS,DB_CLIENT} = process.env;
require("dotenv").config()
module.exports = {

  development: {
    client: process.env.DB_CLIENT,
    connection: process.env.DATABASE_URI,
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
