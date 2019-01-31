const express = require('express');
const HttpStatus = require('http-status-codes');

const { API_BASE_PATH } = require('../constants/api');

const routes = express.Router();

routes.get('', (request, response) => {
  return response.status(HttpStatus.OK).json({ status: 'pass' });
});

module.exports = server => server.use(`${API_BASE_PATH}/status`, routes);
