/**
 * Created by Yash 1300 on 21-03-2018.
 */
const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
        // TODO: ask Karishnu how to make sure that any event under certain organisation has unique eventName. Obviously, that can't be done by setting unique: true
    },
    eventDate: {
        type: String,
        required: true
        // TODO: ask about setting the data type of eventDate as Date or String
    },
    eventLocation: {
        type: String,
        required: true
    },
    hostingOrganisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation',
        required: true
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Event', eventSchema, "events");