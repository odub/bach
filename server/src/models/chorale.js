module.exports = (sequelize, DataTypes) => {
  var Chorale = sequelize.define(
    'Chorale',
    {
      bwv: DataTypes.STRING,
      riemenschneider: DataTypes.INTEGER,
      title: DataTypes.STRING,
      kalmus: DataTypes.INTEGER,
    },
    {},
  );
  Chorale.associate = function(models) {
    Chorale.hasMany(models.Note);
  };
  return Chorale;
};
