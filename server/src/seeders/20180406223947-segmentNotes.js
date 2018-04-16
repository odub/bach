const SQL_UPDATE_NOTES = `
UPDATE "Notes" u
SET "segmentId" = sub."segmentId" 
FROM (
  SELECT n.id, s.id as "segmentId" 
  FROM "Notes" n 
  JOIN "Segments" s
  ON 
    (n.source = s.source) AND
    (n.timespan && s.timespan)
) sub
WHERE sub.id = u.id
`;

const SQL_RESET = `
UPDATE "Notes" SET "segmentId" = NULL
`;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve().then(() =>
      queryInterface.sequelize.query(SQL_UPDATE_NOTES),
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve().then(() =>
      queryInterface.sequelize.query(SQL_RESET),
    );
  },
};
