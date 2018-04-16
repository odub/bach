const models = require('../models');

const SQL_GENERATE_SEGMENT_DATA = `
SELECT
  row_number() OVER (ORDER BY m.id) as id,
  int4range(
    lower(m.timespan),
    greatest(upper(m.timespan), m.end),
    '[)'
  ) as "timespan",
  m.source,
  now() as "createdAt",
  now() as "updatedAt"
FROM (
  SELECT
    *,
    lead(m."prevEnd") OVER (ORDER BY m.id) as end
  FROM (
    SELECT
      *,
      lag(upper(m.timespan)) OVER (ORDER BY m.id) AS "prevEnd"
    FROM "Moments" m
  ) m
  WHERE lower(m.timespan) = lower(m."timespanUnique")
) m
`;

const SQL_GENERATE_SEGMENTS = `
INSERT INTO "Segments"
  ("id", "timespan", "source", "createdAt", "updatedAt")
${SQL_GENERATE_SEGMENT_DATA};
`;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve().then(() =>
      queryInterface.sequelize.query(SQL_GENERATE_SEGMENTS),
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve().then(() =>
      queryInterface.bulkDelete('Segments', null, {}),
    );
  },
};
