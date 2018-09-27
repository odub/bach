module.exports = {
  development: {
    db: {
      username: 'root',
      password: null,
      database: 'bach_development',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
    port: 4000,
  },
  test: {
    db: {
      username: 'root',
      password: null,
      database: 'bach_test',
      host: '127.0.0.1',
      dialect: 'postgres',
      logging: false,
    },
    port: 4001,
  },
  production: {
    db: {
      username: 'root',
      password: null,
      database: 'bach_production',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
    port: 8000,
  },
};
