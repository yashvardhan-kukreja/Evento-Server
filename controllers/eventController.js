/**
 * Created by Yash 1300 on 27-05-2018.
 */

const Promise = require('bluebird');

const EventTransactions = require('../database/events/eventTransactions');

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

// Controller for verifying whether a user is the participant of the given event or not
module.exports.verifyParticipantForAnEvent = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.findParticipantIdsOfAnEvent(event_id, (err, output) => {
            console.log(output);
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else {
                if (!output)
                    reject({succesS: false, message: "No participants of the event found"});
                else {
                    let participantIds = output.participants;
                    (participantIds.indexOf(user_id) >= 0) ? resolve({success: true, message: "User registered to the event"}) : reject({success: false, message: "User not registered to the event"});
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