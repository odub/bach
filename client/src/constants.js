import TEST_MOMENT_0 from './data/0.json';
import TEST_MOMENT_1 from './data/1.json';
import TEST_MOMENT_2 from './data/2.json';
import TEST_MOMENT_3 from './data/3.json';
import TEST_MOMENT_4 from './data/4.json';
import TEST_MOMENT_5 from './data/5.json';
import TEST_MOMENT_6 from './data/6.json';
import TEST_MOMENT_7 from './data/7.json';
import TEST_MOMENT_8 from './data/8.json';
import TEST_MOMENT_9 from './data/9.json';

import START_POINTS_JSON from './data/startPoints.json';

import glyphNames from './assets/fonts/metadata/glyphNames.json';

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://voice-leading.herokuapp.com'
    : 'http://localhost:4000';

export const START_POINTS = START_POINTS_JSON;
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
