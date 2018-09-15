const dataContext = require.context('./data', true, /\.json/);

export const TEST_MOMENTS = dataContext
  .keys()
  .map((key, i) => dataContext(key));
