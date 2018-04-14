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
      parsedXml: DataTypes.JSONB,
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
    Note.belongsTo(models.TieChain, {
      foreignKey: 'tieChainId',
      targetKey: 'id',
    });
    Note.belongsToMany(models.Moment, {
      through: 'MomentNotes',
      foreignKey: 'noteId',
      otherKey: 'momentId',
    });
  };
  return Note;
};
