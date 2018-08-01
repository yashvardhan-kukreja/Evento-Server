/**
 * Created by Yash 1300 on 21-03-2018.
 */

const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventLogoUrl: {
        type: String
    },
    eventId: {
        type: String
    },
    eventSessions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Session'
        }
    ],
    eventSessionScannables: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scannable'
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
    },
    eventEndDate: {
        type: String,
        required: true
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
    sponsors: [
        {
            name: {
                type: String
            },
            img_url: {
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
    ],
    wifiCoupons: [
        {
            coupon_id: {
                type: String
            },
            coupon_password: {
                type: String
            }
        }
    ]
});

// Making sure that there exists no two or more events having same eventName and hostingOrganisation
eventSchema.index({eventName: 1, hostingOrganisation: 1}, {unique: true});

module.exports = mongoose.model('Event', eventSchema, "events");