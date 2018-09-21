const addRequestId = require('express-request-id')({ setHeader: false });

morgan = require('morgan');
morgan.token('id', req => req.id.split('-')[0]);

module.exports = app => {
  app.use(addRequestId);

  app.use(
    morgan('[:date[iso] #:id] Started :method :url for :remote-addr', {
      immediate: true,
    }),
  );

  app.use(
    morgan(
      '[:date[iso] #:id] Completed :method :url :status :res[content-length] - :response-time ms',
    ),
  );
};
