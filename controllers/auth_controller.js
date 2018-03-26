/**
 * Created by abhi on 21-Mar-18.
 */
const Promise = require('bluebird');
const User = require('../database/users/userSchema');

module.exports.get_register = (email, password) => {
    return new Promise((resolve) => {
             var user = new User({email : email, password: password});
             user.save((err) => {
                 if(err) return res.status(200).json({
                    status: 400,
                    message: 'Failed to insert data',
                    info: err
                });
                if(status(200)){
                    return resolve({status: 200, message: 'Sucessfully added new user'});
                }
            });
    });
};