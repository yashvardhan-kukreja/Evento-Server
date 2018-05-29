/**
 * Created by Yash 1300 on 29-03-2018.
 */

const Promise = require('bluebird');
const UserTransactions = require('../database/users/userTransactions');
const EventTransactions = require('../database/events/eventTransactions');

module.exports.getUserDetails = (id) => {
    return new Promise((resolve, reject) => {
        UserTransactions.findUserById(id, (err, outputUser) => {
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

module.exports.fetchParticipatedEvents = (id) => {
    return new Promise((resolve, reject) => {
        UserTransactions.findUserById(id, (err, outputUser) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!outputUser)
                    reject({success: false, message: "No such user exists"});
                else {
                    UserTransactions.fetchParticipatedEvents(id, (err, outputEvents) => {
                        if (err) {
                            console.log(err);
                            reject({success: false, message: "An error occurred"});
                        } else {
                            outputEvents ? resolve({success: true, message: "Participated events fetched", events: outputEvents}) : reject({success: false, message: "Participated in no events"});
                        }
                    });
                }
            }
        });
    });
};

module.exports.registerToAnEvent = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        UserTransactions.findUserById(user_id, (err, outputUser) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!outputUser)
                    reject({success: false, message: "User doesn't exist"});
                else {
                    EventTransactions.findParticipantIdsOfAnEvent(event_id, (err, output) => {
                        if (err) {
                            console.log(err);
                            reject({success: false, message: "An error occurred"});
                        } else {
                            if (!output)
                                reject({success: false, message: "Wrong event ID provided"});
                            else {
                                let ids = output.participants;
                                if (ids.indexOf(user_id) >= 0)
                                    reject({success: false, message: "Already registered to this event"});
                                else {
                                    EventTransactions.addUserToAnEvent(event_id, user_id, (err, outputEvent) => {
                                        if (err) {
                                            console.log(err);
                                            reject({success: false, message: "An error occurred"});
                                        } else {
                                            outputEvent ? resolve({success: true, message: "Registered to the event successfully"}) : reject({success: false, message: "Wrong event ID provided"});
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    });
};