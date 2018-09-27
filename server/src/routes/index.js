module.exports = server => {
  require('./moment')(server);
  require('./analysis')(server);

  return server;
};
