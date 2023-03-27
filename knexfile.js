const { DB_NAME, DB_USER, DB_PASS,DB_CLIENT} = process.env;

module.exports = {

  development: {
    client: process.env.DB_CLIENT,
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
