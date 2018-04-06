module.exports = (sequelize, DataTypes) => {
  var Note = sequelize.define(
    'Note',
    {
      index: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      offset: DataTypes.INTEGER,
      timespan: DataTypes.RANGE(DataTypes.INTEGER),
      measure: DataTypes.INTEGER,
      part: DataTypes.INTEGER,
      source: DataTypes.STRING,
      parsedXml: DataTypes.JSON,
    },
    {
      indexes: [
        {
          fields: ['source'],
        },
      ],
    },
  );
  Note.associate = function(models) {
    Note.belongsTo(models.Chorale, { foreignKey: 'source', targetKey: 'bwv' });
  };
  return Note;
};
