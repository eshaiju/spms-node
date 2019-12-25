const express = require('express');
const users = require('../controllers/api/users');
const login = require('../controllers/api/login');
const admin = require('../models/admin');
const error = require('../middleware/error');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/login', login);
    app.use('/admin', admin);
    app.use(error);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}