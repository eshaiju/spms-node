const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/spms')
        .then(() => winston.info('Connected to MongoDB...'))
        .catch(err => console.error(err.message))
}