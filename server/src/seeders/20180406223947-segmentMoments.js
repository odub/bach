const SQL_UPDATE_NOTES = `
UPDATE "Moments" u
SET "segmentId" = sub."segmentId" 
FROM (
  SELECT m.id, s.id as "segmentId" 
  FROM "Moments" m 
  JOIN "Segments" s
  ON 
    (m.source = s.source) AND
    (m."timespanUnique" && s.timespan)
) sub
WHERE sub.id = u.id
`;

const SQL_RESET = `
UPDATE "Moments" SET "segmentId" = NULL
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
