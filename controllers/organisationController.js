/**
 * Created by Yash 1300 on 29-03-2018.
 */

const Promise = require('bluebird');
const organisationTransactions = require('../database/organisations/organisationTransactions');

module.exports.getOrganisationDetails = (id) => {
    return new Promise((resolve, reject) => {
        organisationTransactions.findOrganisationById(id, (err, outputOrganisation) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!outputUser)
                    reject({success: false, message: "Problem fetching organisation details"});
                else {
                    resolve({success: true, message: "Organisation details fetched successfully", organisation: outputOrganisation});
                }
            }
        });
    });
};