// NB: convention-breaking file naming is to ensure this seeder is run last
const models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.sequelize.sync();
  },

  down: (queryInterface, Sequelize) => {},
};
