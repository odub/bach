module.exports = (sequelize, DataTypes) => {
  var Note = sequelize.define(
    'Note',
    {
      index: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      offset: DataTypes.INTEGER,
      measure: DataTypes.INTEGER,
      part: DataTypes.INTEGER,
      data: DataTypes.JSON,
    },
    {},
  );
  Note.associate = function(models) {
    Note.belongsTo(models.Chorale);
  };
  return Note;
};
