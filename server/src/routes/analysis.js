const express = require('express');
const HttpStatus = require('http-status-codes');

const { API_BASE_PATH } = require('../constants/api');
const models = require('../models');

const routes = express.Router();

routes.post('/continuations/suggest', (request, response) => {
  const { pitches } = request.body;

  models.Analysis.findContinuations({ pitches }).then(result => {
    const { searchKey, continuations } = result;
    return response
      .status(HttpStatus.OK)
      .json({ data: continuations, searchKey });
  });
});

module.exports = server => server.use(`${API_BASE_PATH}/analyses`, routes);
