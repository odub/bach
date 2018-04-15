const models = require('../models');

const SQL_GENERATE_MOMENT_DATA = `
SELECT
  row_number() OVER (
    ORDER BY regexp_replace(t1.source, '[^0-9\.]', '', 'g')::numeric, t1.source, t1.offset
  ) as id,
  int4range(min(lower(ts.timespan)), max(upper(ts.timespan)), '[)') as timespan,
  int4range(max(lower(ts.timespan)), min(upper(ts.timespan)), '[)') as "timespanUnique",
  t1.source,
  now(),
  now()
FROM (
  SELECT
  DISTINCT ON (t.source, t.offset)
    *
  FROM "TieChains" t
) t1
JOIN "TieChains" ts ON
  (ts.source = t1.source) AND
  (ts.timespan @> t1.offset)
GROUP BY t1.id, t1.source, t1.offset
`;

const SQL_GENERATE_MOMENTS = `
INSERT INTO "Moments"
  ("id", "timespan", "timespanUnique", "source", "createdAt", "updatedAt")
${SQL_GENERATE_MOMENT_DATA};
`;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve().then(() =>
      queryInterface.sequelize.query(SQL_GENERATE_MOMENTS),
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve().then(() =>
      queryInterface.bulkDelete('Moments', null, {}),
    );
  },
};
