/**
 * Created by Yash 1300 on 27-07-2018.
 */

const mongoose = require('mongoose');

let sessionSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String,
        default: "No description available"
    },
    scannableType: {
        type: String,
        enum: ["Meal", "Session", "Swag", "Event Registration", "Others"],
        default: "Others"
    },
    participantsPresent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    eventId: {
        type: String
    }
});

module.exports = mongoose.model('Scannable', sessionSchema, "scannables");