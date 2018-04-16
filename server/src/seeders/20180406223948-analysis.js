const models = require('../models');

const ANALYSIS_METHODS = [
  {
    id: 1,
    type: 'END_PITCH',
    description: 'Pitches at segment end boundary',
  },
  {
    id: 2,
    type: 'END_PITCH_CLASS',
    description: 'Pitch classes at segment end boundary',
  },
  {
    id: 3,
    type: 'END_INTERVAL',
    description: 'Intervals above bass at segment end boundary',
  },
  {
    id: 4,
    type: 'END_INTERVAL_CLASS',
    description: 'Interval classes above bass at segment end boundary',
  },
];

const SQL_CREATE_ANALYSES = `
`;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => models.AnalysisMethod.bulkCreate(ANALYSIS_METHODS))
      .then(() => queryInterface.sequelize.query(SQL_CREATE_ANALYSES));
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve().then(() =>
      queryInterface.bulkDelete('AnalysisMethods', null, {}),
    );
  },
};
