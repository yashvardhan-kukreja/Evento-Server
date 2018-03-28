/**
 * Created by Yash 1300 on 21-03-2018.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var organisationSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: true
        // TODO: ask whether to keep the orgName unique or not
    },
    college: {
        type: String,
        required: true
    },
    concernedEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    concernedContact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    authorized: {
        type: Boolean,
        default: true  // Set default: false in the future
    },
    eventsOrganized: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

module.exports = mongoose.model('Organisation', organisationSchema, "organisations");