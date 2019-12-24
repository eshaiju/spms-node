const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');

const app = express();

require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));