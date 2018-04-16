module.exports = (sequelize, DataTypes) => {
  var Segment = sequelize.define(
    'Segment',
    {
      source: DataTypes.STRING,
      timespan: DataTypes.RANGE(DataTypes.INTEGER),
    },
    {
      indexes: [
        {
          fields: ['timespan'],
          using: 'gist',
        },
      ],
    },
  );
  Segment.associate = function(models) {
    Segment.hasMany(models.Note, {
      foreignKey: 'segmentId',
      sourceKey: 'id',
    });
    Segment.belongsToMany(models.Analysis, {
      through: 'SegmentAnalyses',
      foreignKey: 'segmentId',
      otherKey: 'analysisId',
    });
  };
  return Segment;
};
