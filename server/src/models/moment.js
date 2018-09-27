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
      as: 'notes',
      through: 'MomentNotes',
      foreignKey: 'momentId',
      otherKey: 'noteId',
    });
    Moment.belongsToMany(models.Analysis, {
      as: 'analyses',
      through: 'MomentAnalyses',
      foreignKey: 'momentId',
      otherKey: 'analysisId',
    });
    Moment.belongsTo(models.Segment, {
      as: 'segment',
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
  Moment.prototype.findTranspositions = function(...moments) {
    moments.map(m => this.findTransposition(m));
  };
  Moment.prototype.findSimilar = function(options = {}) {
    const defaults = {
      analysisMethod: 7,
      includeSelf: false,
    };
    const optionsDefaulted = { ...defaults, ...options };
    const query =
      'SELECT m.* FROM "Moments" m ' +
      'JOIN "MomentAnalyses" ma ON (ma."momentId" = :id) ' +
      'JOIN "Analyses" a ON (a.id = ma."analysisId") AND (a."methodId" = :analysisMethod) ' +
      'JOIN "MomentAnalyses" similarms ON (a.id = similarms."analysisId") ' +
      'WHERE m.id = similarms."momentId" ' +
      (!!optionsDefaulted.includeSelf ? '' : 'AND :id != m.id ');
    return sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      model: Moment,
      raw: true,
      replacements: {
        id: this.id,
        analysisMethod: optionsDefaulted.analysisMethod,
      },
    });
  };
  return Moment;
};
