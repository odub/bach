const tonal = require('tonal');
const { musicXmlParse } = require('../utils/pitch');
const { Note } = require('.');

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
    Moment.belongsToMany(models.Analysis, {
      through: 'MomentAnalyses',
      foreignKey: 'momentId',
      otherKey: 'analysisId',
    });
    Moment.belongsTo(models.Segment, {
      foreignKey: 'segmentId',
      targetKey: 'id',
    });
  };
  Moment.prototype.findBassPitch = function() {
    return this.getNotes({
      order: [['part', 'desc']],
      limit: 1,
    }).then(ns => musicXmlParse(ns[0].parsedXml.pitch));
  };
  Moment.prototype.findTransposition = function(moment) {
    return Promise.all([this.findBassPitch(), moment.findBassPitch()]).then(
      ([bass1, bass2]) => tonal.Distance.interval(bass1, bass2),
    );
  };
  return Moment;
};
