/**
 * Created by Yash 1300 on 03-07-2018.
 */

const mongoose = require('mongoose');

let sessionSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: String
    }, // in the form of "dd-mm-yyyy"
    startTime: {
        type: String,
        uppercase: true
    }, // In the form of 11AM (example)
    endTime: {
        type: String,
        uppercase: true
    },
    sessionType: {
        type: String,
        enum: ["Meal", "Session", "Swag", "Others"],
        default: "Others"
    },
    sessionId: {
        type: Number
    }, // This will be the sum of the ASCII values of all the characters in the name
    participantsPresent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    eventId: {
        type: String
    }
});

module.exports = mongoose.model('Session', sessionSchema, "sessions");