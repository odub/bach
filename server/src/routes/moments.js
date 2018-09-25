const express = require('express');
const HttpStatus = require('http-status-codes');

const { API_BASE_PATH } = require('../constants/api');

const routes = express.Router();

routes.get('/', (req, res) => res.status(HttpStatus.NOT_IMPLEMENTED).send());
routes.get('/:momentId{[0-9*]}', (req, res) =>
  res.status(HttpStatus.NOT_IMPLEMENTED).send(),
);
routes.get('/suggest', (req, res) =>
  res.status(HttpStatus.OK).send('Hello world!'),
);

module.exports = server => server.use(`${API_BASE_PATH}/moments`, routes);
