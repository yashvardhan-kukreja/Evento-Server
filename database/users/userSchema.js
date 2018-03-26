/**
 * Created by abhi on 21-Mar-18.
 */
const mongoose  = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema    = mongoose.Schema;

const userSchema = new Schema({
    name :  {type: String, required: true},

    password: {type: String, required: true},

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    participatedEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    contact: {
        type: String,
        required: true
    }
});

// Hashing the password of the user before saving it
userSchema.pre('save', (next) => {
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err)
            return next(err);
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema, "users");