const dataContext = require.context('./data', true, /\.json/);

export const TEST_MOMENTS = dataContext
  .keys()
  .map((key, i) => dataContext(key));

export const BASE_FONT_SIZE = 36;
export const NOTEHEAD_COLUMN_WIDTH = 12;
export const LEDGER_LINE_PADDING = NOTEHEAD_COLUMN_WIDTH * 0.35;
export const STAFF_LINE_WIDTH = 9;
