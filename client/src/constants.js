// Explicitly import test moment JSON files to avoid require.context resolution issues in some build environments
const TEST_MOMENT_0 = require('./data/0.json');
const TEST_MOMENT_1 = require('./data/1.json');
const TEST_MOMENT_2 = require('./data/2.json');
const TEST_MOMENT_3 = require('./data/3.json');
const TEST_MOMENT_4 = require('./data/4.json');
const TEST_MOMENT_5 = require('./data/5.json');
const TEST_MOMENT_6 = require('./data/6.json');
const TEST_MOMENT_7 = require('./data/7.json');
const TEST_MOMENT_8 = require('./data/8.json');
const TEST_MOMENT_9 = require('./data/9.json');

const glyphNames = require('./assets/fonts/metadata/glyphNames.json');

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://voice-leading.herokuapp.com'
    : 'http://localhost:4000';

export const START_POINTS = require('./data/startPoints.json');
export const TEST_MOMENTS = [
  TEST_MOMENT_0,
  TEST_MOMENT_1,
  TEST_MOMENT_2,
  TEST_MOMENT_3,
  TEST_MOMENT_4,
  TEST_MOMENT_5,
  TEST_MOMENT_6,
  TEST_MOMENT_7,
  TEST_MOMENT_8,
  TEST_MOMENT_9,
];

export const BASE_FONT_SIZE = 36;
export const NOTEHEAD_COLUMN_WIDTH = 12;
export const LEDGER_LINE_PADDING = NOTEHEAD_COLUMN_WIDTH * 0.35;
export const STAFF_LINE_WIDTH = 9;

export const GLYPHS = Object.keys(glyphNames).reduce((acc, k) => {
  acc[k] = String.fromCharCode(parseInt(glyphNames[k].codepoint.slice(2), 16));
  return acc;
}, {});
