module.exports = (sequelize, DataTypes) => {
  var Analysis = sequelize.define(
    'Analysis',
    {
      key: DataTypes.STRING,
      bass: DataTypes.STRING,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['bass', 'key'],
        },
      ],
    },
  );
  Analysis.associate = function(models) {
    Analysis.belongsToMany(models.Segment, {
      through: 'SegmentAnalyses',
      foreignKey: 'analysisId',
      otherKey: 'segmentId',
    });
    Analysis.belongsTo(models.AnalysisMethod, {
      foreignKey: 'methodId',
      targetKey: 'id',
    });
  };
  return Analysis;
};
