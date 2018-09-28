\t on
\a
WITH output as (
  SELECT array_agg(n."parsedXml"->'pitch' ORDER BY n.part DESC) AS notes FROM (
    SELECT
      DISTINCT m.source,
      min(m.id) OVER (PARTITION BY m.source) AS id
    FROM "Moments" m
  ) AS s
  JOIN "Moments" m ON (m.id = s.id)
  JOIN "MomentNotes" mn on (mn."momentId" = m.id)
  JOIN "Notes" n ON (mn."noteId" = n.id)
  GROUP BY m.id
) SELECT json_agg(output) FROM output;