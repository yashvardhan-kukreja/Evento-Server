/**
 * Created by Yash 1300 on 21-03-2018.
 */
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('./userSchema');

// Function returning a user object corresponding to the provided username or email
module.exports.findUserByUsernameOrEmail = (input) => {
    User.findOne({$or: [{username: input}, {email: input}]}).exec((err, outputUser) => {
        if (err)
            return false;
        else {
            if (!outputUser)
                return false;
            else
                return outputUser;
        }
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