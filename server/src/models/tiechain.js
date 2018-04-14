module.exports = (sequelize, DataTypes) => {
  var TieChain = sequelize.define(
    'TieChain',
    {
      offset: DataTypes.INTEGER,
      timespan: DataTypes.RANGE(DataTypes.INTEGER),
      part: DataTypes.INTEGER,
      source: DataTypes.STRING,
      trivial: DataTypes.BOOLEAN,
    },
    {
      indexes: [
        {
          fields: ['source'],
        },
        {
          fields: ['timespan'],
          using: 'gist',
        },
      ],
    },
  );
  TieChain.associate = function(models) {
    TieChain.hasMany(models.Note, {
      foreignKey: 'tieChainId',
      sourceKey: 'id',
    });
  };
  return TieChain;
};
