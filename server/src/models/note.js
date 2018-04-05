module.exports = (sequelize, DataTypes) => {
  var Note = sequelize.define(
    'Note',
    {
      index: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      offset: DataTypes.INTEGER,
      measure: DataTypes.STRING,
      part: DataTypes.STRING,
      source: DataTypes.STRING,
      data: DataTypes.JSON,
    },
    {},
  );
  Note.associate = function(models) {
    Note.belongsTo(models.Chorale, { foreignKey: 'source', targetKey: 'bwv' });
  };
  return Note;
};
