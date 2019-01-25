const models = require('../models');

const SQL_GENERATE_TIE_CHAINS = `
INSERT INTO "TieChains" ("offset", "source", "part", "length", "timespan", "createdAt", "updatedAt", "id")
SELECT
  n.offset,
  n.source,
  n.part,
  GREATEST(n."nextTieNum" - n.num, 1) as "length",
  int4Range(
    n.offset,
    greatest(
      lead(n."prevFinish") OVER (ORDER BY n.num),
      upper(n.timespan)
    ),
    '[)'
  ) as timespan,
  now() as "createdAt",
  now() as "updatedAt",
  row_number() OVER () as id
FROM (
  SELECT 
    *,
    lead(n.num) OVER (ORDER BY n.num) AS "nextTieNum"
    FROM (
      SELECT 
      *,
      lag(greatest(upper(n.timespan), 0)) OVER (ORDER BY n.num) AS "prevFinish"
      FROM (
        SELECT
          *,
          row_number() OVER (
            ORDER BY
              regexp_replace(n.source, '[^0-9\.]', '', 'g')::numeric,
              n.source,
              n.part,
              n.offset
          ) as num
        FROM "Notes" n
        WHERE n.duration > 0
      ) n
  ) n
  WHERE
    (n."parsedXml"->'ties') IS NULL OR
    (n."parsedXml"->'ties')::text = '[{"type": 0}]'
) n
`;

const SQL_UPDATE_NOTES = `
UPDATE "Notes" u
SET "tieChainId" = sub."tieChainId" 
FROM (
  SELECT n.id, t.id as "tieChainId" 
  FROM "Notes" n 
  JOIN "TieChains" t 
  ON 
    (n.source = t.source) 
    AND (n.part = t.part) 
    AND (n.timespan && t.timespan)
) as sub
WHERE u.id = sub.id
`;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('ALTER TABLE "TieChains" DISABLE TRIGGER ALL;')
      .then(() => queryInterface.sequelize.query(SQL_GENERATE_TIE_CHAINS))
      .then(() => queryInterface.sequelize.query(SQL_UPDATE_NOTES))
      .then(() =>
        queryInterface.sequelize.query(
          'ALTER TABLE "TieChains" ENABLE TRIGGER ALL;',
        ),
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TieChains', null);
  },
};
