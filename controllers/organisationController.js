/**
 * Created by Yash 1300 on 29-03-2018.
 */

const Promise = require('bluebird');
const OrganisationTransactions = require('../database/organisations/organisationTransactions');
const EventTransactions = require('../database/events/eventTransactions');

// Controller for fetching organisation details
module.exports.fetchOrganisationDetails = (id) => {
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

// Controller for hosting an event
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

// This controller will be used to authorize an organisation to make changes only to the events only hosted by it.
// This means that an organisation won't be able to make changes to an event not hosted by it.
module.exports.authorizeOrganisationForAnEvent = (event_id, organisation_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.findEventByEventId(event_id, (err, outputEvent) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "Error occurred while authoriziing the organisation for the event!"});
            } else {
                if (!outputEvent)
                    reject({success: false, message: "Wrong event ID entered"});
                else {
                    if (outputEvent.hostingOrganisation._id == organisation_id)
                        resolve({success: true, message: "Organisation authorized to make changes to the event"});
                    else
                        reject({success: false, message: "Organisation not authorized to make changes to the event"});

                }
            }
        });
    });
};

//Controller for deleting an event
module.exports.deleteAnEvent = (event_id) => {
    return new Promise((resolve, reject) => {
        EventTransactions.deleteEventByEventId(event_id, (err) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred while removing the event"});
            } else
                resolve({success: true, message: "Event removed successfully"});
        });
    });
};

// Controller for adding multiple FAQs to an event in one go
module.exports.addFaqsToAnEvent = (event_id, questions, answers) => {
    return new Promise((resolve, reject) => {
        let faqs = [];
        for (let i = 0; i<questions.length; i++) {
            faqs.push({
                question: questions[i],
                answer: answers[i]
            });
        }
        setTimeout(() => {
            EventTransactions.addFaqs(event_id, faqs, (err) => {
                if (err) {
                    console.log(err);
                    reject({success: false, message: "An error occurred"});
                } else
                    resolve({success: true, message: "Added FAQs to the event"});
            });
        }, 300);
    });
};

//Controller for adding a single FAQ to an event
module.exports.addSingleFaqToAnEvent = (event_id, question, answer) => {
    return new Promise((resolve, reject) => {
        EventTransactions.addASingleFAQ(event_id, question, answer, (err) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else
                resolve({success: true, message: "FAQ added successfully"});
        });
    });
};