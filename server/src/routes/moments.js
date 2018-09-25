const express = require('express');
const HttpStatus = require('http-status-codes');

const { API_BASE_PATH } = require('../constants/api');

const routes = express.Router();

routes.get('/', (request, response) =>
  response.status(HttpStatus.NOT_IMPLEMENTED).send(),
);
routes.get('/:momentId{[0-9*]}', (request, response) =>
  response.status(HttpStatus.NOT_IMPLEMENTED).send(),
);
routes.post('/suggest', (request, response) => {
  const { pitches } = request.body;
  console.log(pitches);

  return response.status(HttpStatus.OK).send('Hello world!');
});

module.exports = server => server.use(`${API_BASE_PATH}/moments`, routes);
