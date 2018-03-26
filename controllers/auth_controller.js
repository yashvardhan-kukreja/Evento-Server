/**
 * Created by abhi on 21-Mar-18.
 */
const Promise = require('bluebird');
const User = require('../database/users/userSchema');

// Function returning promise for executing the registration of a user
module.exports.register = (name, username, email, password, contact) => {
    return new Promise((resolve, reject) => {
        var user = new User({name: name, username: username, email: email, password: password, contact: contact});

        // Checking if the user has completely filled all the fields
        if (name.trim() === "" || name.trim() === null || username.trim() === "" || username.trim() === null || email.trim() === "" || email.trim() === null || password.trim() === "" || password.trim() === null || contact.trim() === "" || contact.trim() === null)
            return reject({success: false, message: "Please enter all the fields"});
        else {

            // Saving the user
            user.save((err) => {
                if(err) {
                    console.log(err);
                    if (err.code === 11000)
                        return reject({success: false, message: "A user already exists with the given username or email"});
                    else
                        return reject({success: false, message: "An error occurred while signing up"});
                } else
                    return resolve({success: true, message: "User registred successfully"});
            });
        }
    });
};