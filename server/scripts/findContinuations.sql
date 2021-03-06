WITH constants (method1, method2) as (values (7, 10))
SELECT 
  max(m.id),
  max(similarms."momentId"),
  max(a."key"),
  max(similarms."momentId" + 1) as continuations,
  nexta.key as nextkey,
  count(*)
FROM (
  SELECT * FROM "Moments" ORDER BY random() LIMIT 1
) m
JOIN constants ON true
JOIN "MomentAnalyses" ma ON (ma."momentId" = m.id)
JOIN "Analyses" a ON (a.id = ma."analysisId") AND (a."methodId" = constants.method1)
JOIN "MomentAnalyses" similarms ON (a.id = similarms."analysisId")
JOIN "MomentAnalyses" nextms ON (similarms."momentId" + 1 = nextms."momentId")
JOIN "Analyses" nexta ON (nexta.id = nextms."analysisId") AND (nexta."methodId" = constants.method2)
GROUP BY nexta.key
ORDER BY count DESC;
