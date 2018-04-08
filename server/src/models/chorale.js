module.exports = (sequelize, DataTypes) => {
  var Chorale = sequelize.define(
    'Chorale',
    {
      bwv: {
        type: DataTypes.STRING,
        unique: true,
      },
      riemenschneider: DataTypes.INTEGER,
      title: DataTypes.STRING,
      kalmus: DataTypes.INTEGER,
    },
    {},
  );
  Chorale.associate = function(models) {
    Chorale.hasMany(models.Note, { foreignKey: 'source', sourceKey: 'bwv' });
  };
  return Chorale;
};
