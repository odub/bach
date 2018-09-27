const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes');
const configurations = require('./configuration');
const log = require('./library/log');

const env = process.env.NODE_ENV || 'development';
const configuration = configurations[env];
const app = express();
const port = process.env.PORT || configuration.port;

app.set('json spaces', 2);
app.use(cookieParser());
app.use('/api', bodyParser.json());

if (configuration.cors) {
  app.use(cors(configuration.cors));
}

log(app);
routes(app);

app.listen(port);
