const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const winston = require('winston');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));