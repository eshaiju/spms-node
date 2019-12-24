const express = require('express');
const users = require('../controllers/api/users');
const login = require('../controllers/api/login');
const admin = require('../models/admin');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/login', login);
    app.use('/admin', admin);
    app.use(error);
}