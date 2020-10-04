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
      host: 'db',
      dialect: 'postgres',
      port: 5432,
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
      host: 'db',
      dialect: 'postgres',
      logging: false,
      port: 5432,
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
