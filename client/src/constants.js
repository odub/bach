const dataContext = require.context('./data', true, /[0-9]+\.json/);

const glyphNames = require('./assets/fonts/metadata/glyphNames.json');

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://voice-leading.herokuapp.com'
    : 'http://localhost:4000';

export const START_POINTS = require('./data/startPoints.json');
export const TEST_MOMENTS = dataContext
  .keys()
  .map((key, i) => dataContext(key));

export const BASE_FONT_SIZE = 36;
export const NOTEHEAD_COLUMN_WIDTH = 12;
export const LEDGER_LINE_PADDING = NOTEHEAD_COLUMN_WIDTH * 0.35;
export const STAFF_LINE_WIDTH = 9;

export const GLYPHS = Object.keys(glyphNames).reduce((acc, k) => {
  acc[k] = String.fromCharCode(parseInt(glyphNames[k].codepoint.slice(2), 16));
  return acc;
}, {});
