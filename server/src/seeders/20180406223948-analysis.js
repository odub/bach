const fs = require('fs');
const tonal = require('tonal');
const _ = {
  chunk: require('lodash/chunk'),
  groupBy: require('lodash/groupBy'),
};

const models = require('../models');
const { musicXmlParse } = require('../utils/pitch');

const ANALYSIS_METHODS = [
  {
    id: 1,
    type: 'PITCH',
    description: 'Pitches',
  },
  {
    id: 2,
    type: 'PITCH_CLASS',
    description: 'Pitch classes',
  },
  {
    id: 3,
    type: 'INTERVAL_WITH_BASS',
    description: 'Intervals above bass',
  },
  {
    id: 4,
    type: 'INTERVAL_CLASS_WITH_BASS',
    description: 'Interval classes above bass',
  },
  {
    id: 5,
    type: 'INTERVAL_WITH_BASS_PC',
    description: 'Intervals above bass pitch class',
  },
  {
    id: 6,
    type: 'INTERVAL_CLASS_WITH_BASS_PC',
    description: 'Interval classes above bass pitch class',
  },
  {
    id: 7,
    type: 'INTERVAL',
    description: 'Intervals',
  },
  {
    id: 8,
    type: 'INTERVAL_CLASS',
    description: 'Interval classes',
  },
];

const SQL_GET_PITCH_DATA = `
SELECT
  "momentId",
  array_agg(pitch) AS pitch
FROM (
  SELECT DISTINCT ON (m.id, n.part)
    m.source,
    m.id as "momentId",
    n.part,
    m."timespanUnique",
    n."parsedXml"->'pitch' AS pitch
  FROM "Moments" m
  JOIN "Notes" n ON
    (n.source = m.source) AND
    (n.timespan && m."timespanUnique")
  ORDER BY m.id, n.part
) n
GROUP BY n."momentId"
`;

const SQL_INSERT_MOMENT_ANALYSES = `
INSERT INTO "MomentAnalyses" ("momentId", "methodId", "analysisId",  "bass")
`;

const ANALYSES_FILE = 'data/analyses.txt';
const MOMENT_ANALYSES_FILE = 'data/momentAnalyses.txt';

const analysisFile = fs.createWriteStream(ANALYSES_FILE);
const momentAnalysisFile = fs.createWriteStream(MOMENT_ANALYSES_FILE);
const writeMomentAnalysis = line =>
  new Promise((resolve, reject) =>
    momentAnalysisFile.write(`${JSON.stringify(line)}\n`, 'utf8', resolve),
  );

let overhang = '';
let count = 0;
const analysisIds = {};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => models.AnalysisMethod.bulkCreate(ANALYSIS_METHODS))
      .then(() =>
        queryInterface.sequelize.query(SQL_GET_PITCH_DATA, { raw: true }),
      )
      .then(records => records[0])
      .then(records =>
        Promise.all(
          records.map(record => {
            const { momentId } = record;
            const bass = record.pitch.slice(-1)[0];
            const voices = record.pitch.slice(0, -1).reverse();
            const bassPitch = musicXmlParse(bass);
            const bassPitchClass = tonal.Note.pc(bassPitch);
            const pitches = voices.map(musicXmlParse);
            const pitchClasses = pitches.map(tonal.Note.pc);
            const intervals = pitches.map(p =>
              tonal.Distance.interval(bassPitch, p),
            );
            const intervalClasses = intervals.map(tonal.Interval.simplify);
            return Promise.all(
              [
                {
                  key: [bassPitch, ...pitches].join(' '),
                  methodId: 1,
                  momentId,
                },
                {
                  key: [bassPitchClass, ...pitchClasses].join(' '),
                  methodId: 2,
                  momentId,
                },
                {
                  key: `${bassPitch}: ${intervals.join(' ')}`,
                  methodId: 3,
                  momentId,
                },
                {
                  key: `${bassPitch}: ${intervalClasses.join(' ')}`,
                  methodId: 4,
                  momentId,
                },
                {
                  key: `${bassPitchClass}: ${intervals.join(' ')}`,
                  methodId: 5,
                  momentId,
                },
                {
                  key: `${bassPitchClass}: ${intervalClasses.join(' ')}`,
                  methodId: 6,
                  momentId,
                },
                {
                  key: intervals.join(' '),
                  methodId: 7,
                  momentId,
                },
                {
                  key: intervalClasses.join(' '),
                  methodId: 8,
                  momentId,
                },
              ].map(writeMomentAnalysis),
            );
          }),
        ),
      )
      .then(
        () =>
          new Promise((resolve, reject) => {
            fs
              .createReadStream(MOMENT_ANALYSES_FILE)
              .on('data', chunk => {
                const lines = `${overhang}${chunk.toString()}`.split('\n');
                overhang = lines.slice(-1)[0];
                const momentAnalyses = lines.slice(0, -1);
                momentAnalyses.forEach(c => {
                  const { key, methodId } = JSON.parse(c);
                  const analysisSignature = `${methodId}:${key}`;
                  if (analysisIds[analysisSignature]) return;
                  analysisIds[analysisSignature] = ++count;
                  analysisFile.write(
                    `${JSON.stringify({ id: count, key, methodId })}\n`,
                  );
                });
              })
              .on('end', () => {
                resolve();
              })
              .on('error', err => {
                reject(err);
              });
          }),
      )
      .then(
        () =>
          new Promise((resolve, reject) => {
            const promises = [];
            fs
              .createReadStream(ANALYSES_FILE)
              .on('data', chunk => {
                const lines = `${overhang}${chunk.toString()}`.split('\n');
                overhang = lines.slice(-1)[0];
                const analyses = lines.slice(0, -1);
                return promises.push(
                  models.Analysis.bulkCreate(analyses.map(a => JSON.parse(a))),
                );
              })
              .on('end', () => {
                resolve(Promise.all(promises));
              })
              .on('error', err => {
                reject(err);
              });
          }),
      )
      .then(
        () =>
          new Promise((resolve, reject) => {
            const promises = [];
            let chunk;
            fs
              .createReadStream(MOMENT_ANALYSES_FILE)
              .on('data', chunk => {
                chunk = chunk;
                const lines = `${overhang}${chunk.toString()}`.split('\n');
                overhang = lines.slice(-1)[0];
                const momentAnalyses = lines.slice(0, -1).map(sa => {
                  const parsedSa = JSON.parse(sa);
                  const analysisId =
                    analysisIds[`${parsedSa.methodId}:${parsedSa.key}`];
                  return { analysisId, ...parsedSa };
                });
                const query =
                  'INSERT INTO "MomentAnalyses" ("momentId", "analysisId", "createdAt", "updatedAt")\n' +
                  `VALUES ${momentAnalyses
                    .map(
                      sa => `(${sa.momentId}, ${sa.analysisId}, now(), now())`,
                    )
                    .join(', ')}`;
                promises.push(queryInterface.sequelize.query(query));
              })
              .on('end', () => {
                resolve(Promise.all(promises));
              })
              .on('error', err => {
                reject(err);
              });
          }),
      );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(() => queryInterface.bulkDelete('AnalysisMethods', null, {}))
      .then(() => queryInterface.bulkDelete('Analyses', null, {}));
  },
};
