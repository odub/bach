module.exports = (sequelize, DataTypes) => {
  var AnalysisMethod = sequelize.define(
    'AnalysisMethod',
    {
      type: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: DataTypes.STRING,
    },
    {
      indexes: [],
    },
  );
  AnalysisMethod.associate = function(models) {
    AnalysisMethod.hasMany(models.Analysis, {
      foreignKey: 'methodId',
      sourceKey: 'id',
    });
  };
  return AnalysisMethod;
};
