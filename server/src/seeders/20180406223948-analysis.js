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
    type: 'END_PITCH',
    description: 'Pitches at segment end boundary',
  },
  {
    id: 2,
    type: 'END_PITCH_CLASS',
    description: 'Pitch classes at segment end boundary',
  },
  {
    id: 3,
    type: 'END_INTERVAL_WITH_BASS',
    description: 'Intervals above bass at segment end boundary',
  },
  {
    id: 4,
    type: 'END_INTERVAL_CLASS_WITH_BASS',
    description: 'Interval classes above bass at segment end boundary',
  },
  {
    id: 5,
    type: 'END_INTERVAL_WITH_BASS_PC',
    description: 'Intervals above bass pitch class at segment end boundary',
  },
  {
    id: 6,
    type: 'END_INTERVAL_CLASS_WITH_BASS_PC',
    description:
      'Interval classes above bass pitch class at segment end boundary',
  },
  {
    id: 7,
    type: 'END_INTERVAL',
    description: 'Intervals at segment end boundary',
  },
  {
    id: 8,
    type: 'END_INTERVAL_CLASS',
    description: 'Interval classes at segment end boundary',
  },
];

const SQL_GET_PITCH_DATA = `
SELECT
  n."segmentId",
  array_agg(n.pitch) as pitch
FROM (
  SELECT DISTINCT ON (n."segmentId", n.part)
    n."segmentId",
    n.part,
    n.id,
    n."parsedXml"->'pitch' as pitch
  FROM (
    SELECT
      *
    FROM "Notes" n
    ORDER BY n.offset DESC
  ) n
) n GROUP BY n."segmentId";
`;

const SQL_INSERT_SEGMENT_ANALYSES = `
INSERT INTO "SegmentAnalyses" ("segmentId", "methodId", "analysisId",  "bass")
`;

const ANALYSES_FILE = 'data/analyses.txt';
const SEGMENT_ANALYSES_FILE = 'data/segmentAnalyses.txt';

const analysisFile = fs.createWriteStream(ANALYSES_FILE);
const segmentAnalysisFile = fs.createWriteStream(SEGMENT_ANALYSES_FILE);
const writeSegmentAnalysis = line =>
  new Promise((resolve, reject) =>
    segmentAnalysisFile.write(`${JSON.stringify(line)}\n`, 'utf8', resolve),
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
            const { segmentId } = record;
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
                  segmentId,
                },
                {
                  key: [bassPitchClass, ...pitchClasses].join(' '),
                  methodId: 2,
                  segmentId,
                },
                {
                  key: `${bassPitch}: ${intervals.join(' ')}`,
                  methodId: 3,
                  segmentId,
                },
                {
                  key: `${bassPitch}: ${intervalClasses.join(' ')}`,
                  methodId: 4,
                  segmentId,
                },
                {
                  key: `${bassPitchClass}: ${intervals.join(' ')}`,
                  methodId: 5,
                  segmentId,
                },
                {
                  key: `${bassPitchClass}: ${intervalClasses.join(' ')}`,
                  methodId: 6,
                  segmentId,
                },
                {
                  key: intervals.join(' '),
                  methodId: 7,
                  segmentId,
                },
                {
                  key: intervalClasses.join(' '),
                  methodId: 8,
                  segmentId,
                },
              ].map(writeSegmentAnalysis),
            );
          }),
        ),
      )
      .then(
        () =>
          new Promise((resolve, reject) => {
            fs
              .createReadStream(SEGMENT_ANALYSES_FILE)
              .on('data', chunk => {
                const lines = `${overhang}${chunk.toString()}`.split('\n');
                overhang = lines.slice(-1)[0];
                const segmentAnalyses = lines.slice(0, -1);
                segmentAnalyses.forEach(c => {
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
              .createReadStream(SEGMENT_ANALYSES_FILE)
              .on('data', chunk => {
                chunk = chunk;
                const lines = `${overhang}${chunk.toString()}`.split('\n');
                overhang = lines.slice(-1)[0];
                const segmentAnalyses = lines.slice(0, -1).map(sa => {
                  const parsedSa = JSON.parse(sa);
                  const analysisId =
                    analysisIds[`${parsedSa.methodId}:${parsedSa.key}`];
                  return { analysisId, ...parsedSa };
                });
                const query =
                  'INSERT INTO "SegmentAnalyses" ("segmentId", "analysisId", "createdAt", "updatedAt")\n' +
                  `VALUES ${segmentAnalyses
                    .map(
                      sa => `(${sa.segmentId}, ${sa.analysisId}, now(), now())`,
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
