SELECT DISTINCT array_agg(n2.id ORDER BY n2.part) AS arr 
FROM "Notes" n1, "Notes" n2
WHERE n1.source = n2.source AND n2.timespan @> n1.offset
GROUP BY n1.id;
