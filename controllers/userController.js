/**
 * Created by Yash 1300 on 29-03-2018.
 */


const Promise = require('bluebird');
const userTransactions = require('../database/users/userTransactions');

module.exports.getUserDetails = (id) => {
    return new Promise((resolve, reject) => {
        userTransactions.findUserById(id, (err, outputUser) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!outputUser)
                    reject({success: false, message: "Problem fetching user details"});
                else {
                    resolve({success: true, message: "User details fetched successfully", user: outputUser});
                }
            }
        });
    });
};