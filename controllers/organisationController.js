/**
 * Created by Yash 1300 on 29-03-2018.
 */

const Promise = require('bluebird');
const OrganisationTransactions = require('../database/organisations/organisationTransactions');
const EventTransactions = require('../database/events/eventTransactions');

module.exports.getOrganisationDetails = (id) => {
    return new Promise((resolve, reject) => {
        OrganisationTransactions.findOrganisationById(id, (err, outputOrganisation) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!outputOrganisation)
                    reject({success: false, message: "Problem fetching organisation details"});
                else {
                    resolve({success: true, message: "Organisation details fetched successfully", organisation: outputOrganisation});
                }
            }
        });
    });
};

module.exports.hostAnEvent = (name, date, location, organisation_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.addAnEvent(name, date, location, organisation_id, (err) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else
                resolve({success: true, message: "Event hosted successfully"});
        });
    });
};

module.exports.deleteAnEvent = (event_id, organisation_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.findEventByEventId(event_id, (err, outputEvent)=> {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred while removing the event"});
            } else {
                if (!outputEvent)
                    reject({success: false, message: "Wrong event id entered"});
                else {
                    if (outputEvent.hostingOrganisation._id ==  organisation_id) {
                        EventTransactions.deleteEventByEventId(event_id, (err) => {
                            if (err) {
                                console.log(err);
                                reject({success: false, message: "An error occurred while removing the event"});
                            } else
                                resolve({success: true, message: "Event removed successfully"});
                        });
                    } else
                        reject({success: false, message: "Not authorized to delete this event"});
                }
            }
        });
    });
};