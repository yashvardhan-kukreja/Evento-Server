/**
 * Created by Yash 1300 on 21-03-2018.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('./userSchema');

// Function returning a user object corresponding to the provided username or email
module.exports.findUserByUsernameOrEmail = (input, next) => {
    User.findOne({$or: [{username: input}, {email: input}]}).exec(next);
};

// Function for adding a user to the database
module.exports.addUser = (user, next) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            user.save(next);
        });

    });
};

// Function for comparing password for a user object
module.exports.comparePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
};

// Function for generating a token for a user object
module.exports.generateToken = (user, secret) => {
    return jwt.sign(JSON.parse(JSON.stringify(user)), secret);
};