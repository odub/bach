const LOCAL_ORIGIN_MATCHER = new RegExp(
  '^https?://(localhost|127\\.0\\.0\\.1|.*\\.local)(:[\\d]+)?(/|$)',
);
const CORS_ORIGIN_REGEX = process.env.CORS_ORIGIN_MATCHER
  ? new RegExp(process.env.CORS_ORIGIN_MATCHER)
  : false;

module.exports = {
  development: {
    db: {
      username: 'root',
      password: null,
      database: 'bach_development',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
    cors: {
      credentials: true,
      origin: LOCAL_ORIGIN_MATCHER,
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
    cors: {
      credentials: true,
      origin: LOCAL_ORIGIN_MATCHER,
    },
    port: 4001,
  },
  production: {
    db: {
      dialect: 'postgres',
      use_env_variable: 'DATABASE_URL',
    },
    cors: {
      credentials: true,
      origin: CORS_ORIGIN_REGEX,
    },
    port: 8000,
  },
};
