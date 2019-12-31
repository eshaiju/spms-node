const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    emp_id: {
        type: String,
        minlength: 3,
        maxlength: 10,
        // unique: true
    },
    designation: {
        type: String
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Project'
        }
    ],
    image: { type: String },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        // emp_id: Joi.string().min(3).max(10).required(),
        designation: Joi.string()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;