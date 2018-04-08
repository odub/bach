const models = require('../models');

const SQL_GENERATE_TIE_CHAINS = `
INSERT INTO "TieChains" ("offset", "source", "part", "timespan", "trivial", "createdAt", "updatedAt", "id")
SELECT
  n.offset,
  n.source,
  n.part,
  int4range(
    n.offset,
    CASE WHEN min(upper(chain_end.timespan)) IS NULL THEN upper(n.timespan) ELSE min(upper(chain_end.timespan)) END,
    '[)'
  ) as timespan,
  CASE WHEN count(chain_end.id) = 0 THEN true ELSE FALSE END as trivial,
  now() as "createdAt",
  now() as "updatedAt",
  (row_number() OVER (
    ORDER BY
      regexp_replace(n.source, '[^0-9\.]', '', 'g')::numeric,
      n.source,
      n.offset,
      n.part
  ))::integer as id
FROM "Notes" n
LEFT OUTER JOIN "Notes" chain_end ON
  (n."parsedXml"->'ties')::text = '[{"type":0}]' AND
  (n.source = chain_end.source) AND
  (n.part = chain_end.part) AND
  (n.offset < chain_end.offset) AND
  (chain_end."parsedXml"->'ties') IS NOT NULL AND
  (chain_end."parsedXml"->'ties')::text LIKE '%"type":1%'
WHERE
  (n."parsedXml"->'ties') IS NULL OR
  (n."parsedXml"->'ties')::text = '[{"type":0}]'
GROUP BY n.id
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
