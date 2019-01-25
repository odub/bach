const tonal = require('tonal');

module.exports = (sequelize, DataTypes) => {
  var Analysis = sequelize.define(
    'Analysis',
    {
      key: {
        type: DataTypes.STRING,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['methodId', 'key'],
        },
      ],
    },
  );
  Analysis.associate = function(models) {
    Analysis.belongsToMany(models.Moment, {
      through: 'MomentAnalyses',
      foreignKey: 'analysisId',
      otherKey: 'momentId',
    });
    Analysis.belongsTo(models.AnalysisMethod, {
      foreignKey: 'methodId',
      targetKey: 'id',
    });
  };
  Analysis.findContinuations = function(options = { pitches: [] }) {
    const { pitches } = options;
    const [bass, ...otherVoices] = pitches;
    const intervals = otherVoices.map(p => tonal.Distance.interval(bass, p));
    const analysisString = intervals.join(' ');
    const query = [
      'SELECT',
      '  nexta.key as "continuation",',
      '  max(similarms."momentId" + 1) as "momentId",',
      '  count(*)::int',
      'FROM (',
      '  SELECT * FROM "Analyses" a',
      '  WHERE a.key = :key AND a."methodId" = :analysisMethod1',
      '  LIMIT 1',
      ') a',
      'JOIN "MomentAnalyses" similarms ON (a.id = similarms."analysisId")',
      'JOIN "MomentAnalyses" nextms ON (similarms."momentId" + 1 = nextms."momentId")',
      'JOIN "Analyses" nexta ON (nexta.id = nextms."analysisId") AND (nexta."methodId" = :analysisMethod2) AND (nexta.key NOT SIMILAR TO \'\\s+\')',
      'GROUP BY nexta.key',
      'ORDER BY count DESC;',
    ].join('\n');

    return sequelize
      .query(query, {
        type: sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: {
          key: analysisString,
          analysisMethod1: 7,
          analysisMethod2: 9,
        },
      })
      .then(continuations =>
        continuations.map(c => {
          c.continuation = c.continuation
            .split(/\s/)
            .map(v => (v === '.' ? null : v));
          return c;
        }),
      )
      .then(continuations => ({ continuations, searchKey: analysisString }));
  };
  return Analysis;
};
