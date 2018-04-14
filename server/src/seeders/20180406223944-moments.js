const models = require('../models');

const SQL_GENERATE_MOMENT_DATA = `
SELECT
  row_number() OVER (
    ORDER BY regexp_replace(n.source, '[^0-9\.]', '', 'g')::numeric, n.source, n.offset
  ) as id,
  int4range(min(lower(t.timespan)), max(upper(t.timespan)), '[)') as timespan,
  int4range(max(lower(t.timespan)), min(upper(t.timespan)), '[)') as "timespanUnique",
  n.source,
  now(),
  now()
FROM "Notes" n
JOIN "TieChains" t ON
  (t.source = n.source) AND
  (t.timespan @> n.offset) AND
  ((n."parsedXml"->'ties')::text IS NULL OR
  (n."parsedXml"->'ties')::text = '[{"type":0}]')
WHERE
  (n."parsedXml"->'ties')::text IS NULL OR
  (n."parsedXml"->'ties')::text = '[{"type":0}]'
GROUP BY n.id
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
