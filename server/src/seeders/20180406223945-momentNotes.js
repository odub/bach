const models = require('../models');

const SQL_GENERATE_MOMENT_NOTE_DATA = `
SELECT mns.id as "noteId", m.id as "momentId", m."createdAt", m."updatedAt"
FROM "Moments" m
JOIN "Notes" mns ON
  (mns.timespan @> lower(m."timespanUnique")) AND
  (mns.source = m.source)
ORDER BY m.id
`;

const SQL_GENERATE_MOMENT_NOTES = `
INSERT INTO "MomentNotes"
  ("noteId", "momentId", "createdAt", "updatedAt")
${SQL_GENERATE_MOMENT_NOTE_DATA}
`;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve().then(() =>
      queryInterface.sequelize.query(SQL_GENERATE_MOMENT_NOTES),
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MomentNotes', null, {});
  },
};
