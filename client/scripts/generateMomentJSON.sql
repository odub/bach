\t on
\a
WITH output as (
  SELECT
    n.*
  FROM (SELECT * FROM "Moments" ORDER BY random() LIMIT 1) m
  JOIN "MomentNotes" mn ON (m.id = mn."momentId")
  JOIN "Notes" n on (n.id = mn."noteId")
)
SELECT json_agg(output) from output;