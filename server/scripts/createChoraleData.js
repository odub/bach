const { CATALOGUE, DB_BWVS } = require('../src/constants/choraleCatalogue');

DB_BWVS.forEach(bwv => {
  console.info(JSON.stringify(CATALOGUE[bwv]));
});
