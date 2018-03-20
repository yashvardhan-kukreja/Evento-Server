/**
 * Created by abhi on 21-Mar-18.
 */
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const userSchema = Schema({
    uname :  {type: String, required: true},

    passwd: {type: String, required: true}

});

const User = mongoose.model('User', userSchema);

module.exports = User;