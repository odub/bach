module.exports = server => {
  require('./status')(server);
  require('./moment')(server);
  require('./analysis')(server);

  return server;
};
