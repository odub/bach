const express = require('express');

const routes = require('./routes');
const configurations = require('./configuration');
const log = require('./library/log');

const env = process.env.NODE_ENV || 'development';
const configuration = configurations[env];
const app = express();
const port = process.env.PORT || configuration.port;

log(app);
routes(app);

app.listen(port);
