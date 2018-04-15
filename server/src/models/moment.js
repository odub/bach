module.exports = (sequelize, DataTypes) => {
  var Moment = sequelize.define(
    'Moment',
    {
      source: DataTypes.STRING,
      timespan: DataTypes.RANGE(DataTypes.INTEGER),
      timespanUnique: DataTypes.RANGE(DataTypes.INTEGER),
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
  Moment.associate = function(models) {
    Moment.belongsToMany(models.Note, {
      through: 'MomentNotes',
      foreignKey: 'momentId',
      otherKey: 'noteId',
    });
  };
  return Moment;
};
