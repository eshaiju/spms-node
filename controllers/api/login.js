const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');

const {User} = require('../../models/user');
const { UserSerializer } = require('../../serializers/user_serializer');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    // res.header('x-auth-token', token).json(UserSerializer.serialize(user));
    res.json({ user: UserSerializer.serialize(user), token });
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
