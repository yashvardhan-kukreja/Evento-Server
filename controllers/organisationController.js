/**
 * Created by Yash 1300 on 29-03-2018.
 */

const Promise = require('bluebird');
const OrganisationTransactions = require('../database/organisations/organisationTransactions');
const EventTransactions = require('../database/events/eventTransactions');
const SessionTransactions = require('../database/sessions/sessionTransactions');
const Middlewares = require('../middlewares');

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
module.exports.hostAnEvent = (name, event_session_names, coordinator_emails, start_date, end_date, location, organisation_id, reg_fees, about, pointOfContacts, faqs) => {
    return new Promise((resolve, reject) => {
        EventTransactions.addAnEvent(name, event_session_names, coordinator_emails, start_date, end_date, location, organisation_id, reg_fees, about, pointOfContacts, faqs, (err) => {
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

// Controller for adding one or more FAQs to an event in one go
module.exports.addFaqsToAnEvent = (event_id, questions, answers) => {
    return new Promise((resolve, reject) => {
        if (typeof (questions) === 'string') {
            EventTransactions.addASingleFAQ(event_id, questions, answers, (err) => {
                if (err) {
                    console.log(err);
                    reject({success: false, message: "An error occurred"});
                } else
                    resolve({success: true, message: "FAQ added successfully"});
            });
        } else {
            var faqs = [];
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
        }
    });
};

// Controller for adding one or more speakers to an event in one go
module.exports.addSpeakersToAnEvent = (event_id, names, descriptions, img_urls) => {
    return new Promise((resolve, reject) => {
        if (typeof(names) === 'string') {
            EventTransactions.addASingleSpeaker(event_id, names, descriptions, img_urls, (err) => {
                if (err) {
                    console.log(err);
                    reject({success: false, message: "An error occurred"});
                } else
                    resolve({success: true, message: "Speaker added to the event"});
            });
        } else {
            let speakers = [];
            for (let i = 0; i<names.length; i++) {
                speakers.push({
                    name: names[i],
                    description: descriptions[i],
                    image_url: img_urls[i]
                });
            }
            setTimeout(() => {
                EventTransactions.addSpeakers(event_id, speakers, (err) => {
                    if (err) {
                        console.log(err);
                        reject({success: false, message: "An error occurred"});
                    } else
                        resolve({success: true, message: "Speakers added to the event"});

                });
            }, 300);
        }
    });
};

// Controller for adding fees to the event
module.exports.addFeesToTheEvent = (event_id, amount, description) => {
    return new Promise((resolve, reject) => {
        EventTransactions.addASingleRegFeesTotheEvent(event_id, amount, description, (err) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else
                resolve({success: true, message: "Fees added to the event"});

        });
    });
};

// Controller for modifying the 'about' of the given event
module.exports.modifyAboutOfTheEvent = (event_id, about) => {
    return new Promise((resolve, reject) => {
        EventTransactions.modifyAboutOfTheEvent(event_id, about, (err) => {
            if (err) {
                console.log(err);
                reject({success: false, message: "An error occurred"});
            } else
                resolve({success: true, message: "Modified the 'about' of the event"});
        });
    });
};

// Controller for adding one or more coordinators to an event
module.exports.addCoordinators = (event_id, coordinator_emails) => {
    return new Promise((resolve, reject) => {
        if (typeof(coordinator_emails) === 'string') {
            EventTransactions.addASingleCoordinator(event_id, coordinator_emails, (err) => {
                if (err) {
                    console.log(err);
                    reject({success: false, message: "An error occurred"});
                } else
                    resolve({success: true, message: "Coordinator added to the event"});
            });
        } else {
            EventTransactions.addCoordinators(event_id, coordinator_emails, (err) => {
                if (err) {
                    console.log(err);
                    reject({success: false, message: "An error occurred"});
                } else
                    resolve({success: true, message: "Coordinators added to the event"});
            });
        }
    });
};

// Controller for adding one or more Sessions to an event
module.exports.addSessions = (event_obj_id, names, locations, start_times, end_times, dates, types) => {
    return new Promise((resolve, reject) => {
        if (typeof(names) === 'string') {
            SessionTransactions.addASingleSession(event_obj_id, names, locations, dates, start_times, end_times, types, (err, savedSession) => {
                if (err) {
                    console.log(err);
                    reject({success: false, message: "An error occurred"});
                } else {
                    EventTransactions.addASingleSession(event_obj_id, savedSession._id, (err) => {
                        if (err) {
                            console.log(err);
                            reject({success: false, message: "An error occurred"});
                        } else
                            resolve({success: true, message: "Added a session to the event"});
                    });
                }
            });
            /*EventTransactions.addASingleSession(event_id, names, locations, dates, start_times, end_times, (err) => {
                if (err) {
                    console.log(err);
                    reject({success: false, message: "An error occurred"});
                } else
                    resolve({success: true, message: "Added a session to the event"});
            });*/
        } else {
            let sessions_saved = [];
            for (let i=0;i<names.length;i++) {
                SessionTransactions.addASingleSession(event_obj_id, names, locations, dates, start_times, end_times, types, (err, savedSession) => {
                    if (err) {
                        console.log(err);
                    } else {
                        sessions_saved.push(savedSession._id);
                    }
                });
            }
            setTimeout(() => {
                EventTransactions.addSessions(event_obj_id, sessions_saved, (err) => {
                    if (err) {
                        console.log(err);
                        reject({success: false, message: "An error occurred"});
                    } else
                        resolve({success: true, message: "Added sessions to the event"});
                });
            }, 300);
        }
    });
};

// Controller for adding one or more point of contacts to an event
module.exports.addPointOfContacts = (event_id, names, contacts, emails) => {
    return new Promise((resolve, reject) => {
        if (typeof (names) === 'string') {
            EventTransactions.addASinglePointOfContact(event_id, names, emails, contacts, (err) => {
                if (err) {
                    console.log(err);
                    reject({success: false, message: "An error occurred"});
                } else
                    resolve({success: true, message: "Point of contact added successfully"});
            });
        } else {
            let pocs = [];
            for (let i = 0; i<names.length; i++) {
                pocs.push({
                    name: names[i],
                    contact: contacts[i],
                    email: emails[i]
                });
            }
            setTimeout(() => {
                EventTransactions.addPointOfContacts(event_id, pocs, (err) => {
                    if (err) {
                        console.log(err);
                        reject({success: false, message: "An error occurred"});
                    } else
                        resolve({success: true, message: "Added point of contacts"});
                });
            }, 300);
        }
    });
};