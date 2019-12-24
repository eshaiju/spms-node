const Joi = require('joi');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});


const Project = mongoose.model('Project', projectSchema);

function validateProject(project) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    };

    return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;