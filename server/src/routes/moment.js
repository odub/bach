const express = require('express');
const HttpStatus = require('http-status-codes');

const { API_BASE_PATH } = require('../constants/api');
const models = require('../models');

const routes = express.Router();

routes.get('/', (request, response) =>
  response.status(HttpStatus.NOT_IMPLEMENTED).send(),
);

routes.get('/:momentId([0-9]+)', (request, response) => {
  const { momentId } = request.params;
  return models.Moment.findOne({
    where: { id: momentId },
    include: ['notes'],
  }).then(
    moment => response.status(HttpStatus.OK).json(moment),
    error => response.status(HttpStatus.NOT_FOUND).send(),
  );
});

module.exports = server => server.use(`${API_BASE_PATH}/moments`, routes);
