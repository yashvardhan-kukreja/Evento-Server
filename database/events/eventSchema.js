/**
 * Created by Yash 1300 on 21-03-2018.
 */
const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventId: {
        type: String
    },
    eventSessions: [
        {
            name: {
                type: String
            },
            time: {
                type: String,
                uppercase: true
            }, // In the form of 11AM (example)
            sessionId: {
                type: Number
            } // This will be the sum of the ASCII values of all the characters in the name
        }
    ],
    coordinatorEmails: [
        {
            type: String,
            lowercase: true
        }
    ],
    eventStartDate: {
        type: String,
        required: true
        // TODO: ask about setting the data type of eventDate as Date or String
    },
    eventEndDate: {
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
    ],
    faqs: [
        {
            question: {
                type: String
            },
            answer: {
                type: String
            }
        }
    ],
    speakers: [
        {
            name: {
                type: String
            },
            description: {
                type: String
            },
            image_url: {
                type: String
            }
        }
    ],
    fees: [
        {
            amount: {
                type: Number
            },
            description: {
                type: String
            }
        }
    ],
    about: {
        type: String,
        default: "No description available"
    },
    pointOfContacts: [
        {
            name: {
                type: String
            },
            email: {
                type: String
            },
            contact: {
                type: String
            }
        }
    ]
});

// Making sure that there exists no two or more events having same eventName and hostingOrganisation
eventSchema.index({eventName: 1, hostingOrganisation: 1}, {unique: true});

module.exports = mongoose.model('Event', eventSchema, "events");