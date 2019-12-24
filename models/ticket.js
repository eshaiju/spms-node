const Joi = require('joi');
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticket_no: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 225
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 225
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    maximum_permitted_time: {
        type: Number
    },
    project: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Project',
        required: true
    },
    assigned_user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    created_user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

function validateTicket(ticket) {
    const schema = {
        ticket_no: Joi.string().min(1).max(225).required(),
        title: Joi.string().min(3).max(225).required()
    };

    return Joi.validate(ticket, schema);
}

exports.Ticket = Ticket;
exports.validate = validateTicket;