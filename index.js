const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const login = require('./routes/login');
const admin = require('./routes/admin');
const app = express();

mongoose.connect('mongodb://localhost/spms')
    .then(() => console.log('connected to MongoDB.....'))
    .catch(err => console.error(err.message))

app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/admin', admin);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));