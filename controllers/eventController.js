/**
 * Created by Yash 1300 on 27-05-2018.
 */

const Promise = require('bluebird');

const EventTransactions = require('../database/events/eventTransactions');
const UserTransactions = require('../database/users/userTransactions');
const SessionTransactions = require('../database/sessions/sessionTransactions');

// Controller for fetching the event details
module.exports.fetchEventDetails = (event_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.findEventByEventId(event_id, (err, outputEvent) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                outputEvent ? resolve({success: true, message: "Event details fetched successfully", event: outputEvent}) : reject({success: false, message: "No such event found!"});
            }
        });
    });
};

// Controller for fetching the list of participants in an event
module.exports.listOfParticipantsForEvent = (event_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.findParticipantsOfAnEvent(event_id, (err, output) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                output ? resolve({success: true, message: "Participants fetched successfully", participants: output.participants}) : reject({success: false, message: "No participants found in this event!"});
            }
        });
    });
};

// Controller for verifying whether a user is the participant or coordinator of the given event or not
module.exports.verifyParticipantOrCoordinatorForAnEvent = (user_id, user_email, event_id, secret) => {
    return new Promise((resolve, reject) => {
        EventTransactions.findParticipantIdsOfAnEvent(event_id, (err, output) => {
            console.log(output);
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!output)
                    reject({success: false, message: "No participants of the event found"});
                else {
                    let participantIds = output.participants;
                    if (participantIds.indexOf(user_id) >= 0) {
                        let encrypted_id = UserTransactions.encryptUserAndEventIdAES(secret, user_id, event_id);
                        resolve({success: true, message: "User registered to the event", is_coordinator: false, encrypted_id: encrypted_id});
                    } else {
                        EventTransactions.findCoordinatorEmailsOfAnEvent(event_id, (err, output1) => {
                            if (err) {
                                console.log(err);
                                reject({success: false, message: "An error occurred"});
                            } else {
                                if (!output1)
                                    reject({success: false, message: "No coordinators found for this event"});
                                else {
                                    let coordinatorEmails = output1.coordinatorEmails;
                                    if (coordinatorEmails.indexOf(user_email) >= 0) {
                                        resolve({success: true, message: "Coordinator registered to the event", is_coordinator: true})
                                    } else {
                                        reject({success: false, message: "User not registered to the event"});
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
    });
};

// Controller for fetching the FAQs of the given event
module.exports.fetchFaqs = (event_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.fetchFaqs(event_id, (err, output) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!output)
                    reject({success: false, message: "No FAQs are there for this event!"});
                else {
                    let faqs = output.faqs;
                    resolve({success: true, message: "Fetched all the FAQs for this event", faqs: faqs});
                }
            }
        });
    });
};

// Controller for fetching the participants of a specific session
module.exports.fetchParticipantsPresentInASession = (session_id) => {
    return new Promise((resolve, reject) => {
        SessionTransactions.findParticipantsPresentOfASession(session_id, (err, output) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!output)
                    reject({success: false, message: "No such session found"});
                else {
                    let participantsPresent = output.participantsPresent;
                    resolve({success: true, message: "Participants present fetched", participants: participantsPresent});
                }
            }
        });
    });
};

module.exports.fetchSessionsOfAnEvent = (event_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.findSessionsOfAnEvent(event_id, (err, output) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!output)
                    reject({success: false, message: "No such event found"});
                else {
                    let sessions = output.eventSessions;
                    resolve({success: true, message: "Event sessions fetched", sessions: sessions});
                }
            }
        });
    });
};

module.exports.fetchSponsorsOfAnEvent = (event_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.findSponsorsOfAnEvent(event_id, (err, output) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                let sponsors = output.sponsors;
                resolve({success: true, message: "Sponsors fetched successfully", sponsors: sponsors});
            }
        });
    });
};