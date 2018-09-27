const config = require('../src/configuration');

const dbConfig = Object.keys(config).reduce((acc, v) => {
  acc[v] = config[v].db;
  return acc;
}, {});

console.info(JSON.stringify(dbConfig, null, '  '));
