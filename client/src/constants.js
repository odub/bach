const dataContext = require.context('./data', true, /\.json/);

export const TEST_MOMENTS = dataContext
  .keys()
  .map((key, i) => dataContext(key));

export const NOTEHEAD_WIDTH = 12;
export const NOTEHEAD_COLUMN_WIDTH = 11.5;
export const LEDGER_LINE_PADDING = NOTEHEAD_WIDTH * 0.375;
export const STAFF_LINE_WIDTH = 10;
