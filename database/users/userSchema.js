/**
 * Created by abhi on 21-Mar-18.
 */
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const userSchema = new Schema({
    name :  {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
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
    contact: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema, "users");