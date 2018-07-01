/**
 * Created by Yash 1300 on 21-03-2018.
 */

const Event = require('./eventSchema');
const Middlewares = require('../../middlewares');

module.exports.findEventByEventName = (event_name, next) => {
    Event.findOne({eventName: event_name}, {participants: 0}).populate({path: 'hostingOrganisation', model: 'Organisation'}).exec(next);
};

module.exports.findEventByEventId = (event_id, next) => {
    Event.findOne({eventId: event_id}, {participants: 0}).populate({path: 'hostingOrganisation', model: 'Organisation'}).exec(next);
};

module.exports.addAnEvent = (name, event_session_names, coordinator_emails, start_date, end_date, location, organisation_id, reg_fees, about, pointOfContacts, faqs, next) => {

    let eventSessions = [];

    for (let i=0; i<event_session_names.length;i++) {
        let currentSessionId = Middlewares.convertAStringToNumber(event_session_names[i]);
        eventSessions.push({
            name: event_session_names[i],
            sessionId: currentSessionId
        });
    }

    setTimeout(()=> {
        let newEvent = new Event({
            eventName: name,
            eventSessions: eventSessions,
            eventId: name.toLowerCase().replace(" ", "_"),
            eventStartDate: start_date,
            eventEndDate: end_date,
            eventLocation: location,
            coordinatorEmails: coordinator_emails,
            hostingOrganisation: organisation_id,
            fees: reg_fees,
            pointOfContacts: pointOfContacts,
            faqs: faqs,
            about: about
        });
        newEvent.save(next);
    }, 100);

};

module.exports.findParticipantsOfAnEvent = (event_id, next) => {
    Event.findOne({eventId: event_id}, 'participants').populate({path: 'participants', model: 'User'}).exec(next);
};

module.exports.findParticipantIdsOfAnEvent = (event_id, next) => {
    Event.findOne({eventId: event_id}, 'participants').exec(next);
};

module.exports.findCoordinatorEmailsOfAnEvent = (event_id, next) => {
    Event.findOne({eventId: event_id}, 'coordinatorEmails').exec(next);
};

module.exports.deleteEventByEventName = (event_name, next) => {
    Event.findOneAndRemove({eventName: event_name}).exec(next);
};

module.exports.deleteEventByEventId = (event_id, next) => {
    Event.findOneAndRemove({eventId: event_id}).exec(next);
};

module.exports.addUserToAnEvent = (event_id, user_id, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {$push: {participants: user_id}}).exec(next);
};

module.exports.fetchParticipatedEvents = (user_id, next) => {
    Event.find({participants: user_id}, {participants: 0}).populate({path: 'hostingOrganisation', model: 'Organisation'}).exec(next);
};

module.exports.addFaqs = (event_id, faqs, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {$push: {faqs: {$each: faqs}}}).exec(next);
};

module.exports.addASingleFAQ = (event_id, question, answer, next) => {
    let faq = {
        question: question,
        answer: answer
    };
    Event.findOneAndUpdate({eventId: event_id}, {$push: {faqs: faq}}).exec(next);
};

module.exports.addASingleCoordinator = (event_id, coordinator_email, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {$addToSet:{coordinatorEmails: coordinator_email}}).exec(next);
};

module.exports.addCoordinators = (event_id, coordinator_emails, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {$addToSet:{coordinatorEmails: {$each: coordinator_emails}}}).exec(next);
};

module.exports.fetchFaqs = (event_id, next) => {
    Event.findOne({eventId: event_id}, 'faqs').exec(next);
};

module.exports.addASingleSpeaker = (event_id, name, description, img_url, next) => {
    let speaker = {
        name: name,
        description: description,
        image_url: img_url
    };
    Event.findOneAndUpdate({eventId: event_id}, {$push: {speakers: speaker}}).exec(next);
};

module.exports.addSpeakers = (event_id, speakers, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {$push: {speakers: {$each: speakers}}}).exec(next);
};

module.exports.addASingleSession = (event_id, session_name, session_location, session_date, session_start_time, session_end_time, next) => {
    let sessionId = Middlewares.convertAStringToNumber(session_name);
    let session = {
        name: session_name,
        date: session_date,
        startTime: session_start_time,
        endTime: session_end_time,
        location: session_location,
        sessionId: sessionId
    };
    Event.findOneAndUpdate({eventId: event_id}, {$push: {eventSessions: session}}).exec(next);
};

module.exports.addSessions = (event_id, sessions, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {$push: {eventSessions: {$each: sessions}}}).exec(next);
};

module.exports.addASingleRegFeesTotheEvent = (event_id, amount, description, next) => {
    let fees = {
        amount: amount,
        description: description
    };
    Event.findOneAndUpdate({eventId: event_id}, {$push: {fees: fees}}).exec(next);
};

module.exports.modifyAboutOfTheEvent = (event_id, about, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {about: about}).exec(next);
};

module.exports.addPointOfContacts = (event_id, contacts, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {$push: {pointOfContacts: {$each: contacts}}}).exec(next);
};

module.exports.addASinglePointOfContact = (event_id, name, email, contact_number, next) => {
    let poc = {
        name: name,
        email: email,
        contact: contact_number
    };
    Event.findOneAndUpdate({eventId: event_id}, {$push: {pointOfContacts: poc}}).exec(next);
};