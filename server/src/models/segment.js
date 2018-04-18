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
    Segment.hasMany(models.Moment, {
      foreignKey: 'segmentId',
      sourceKey: 'id',
    });
  };
  return Segment;
};
