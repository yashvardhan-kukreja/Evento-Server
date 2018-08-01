/**
 * Created by Yash 1300 on 21-03-2018.
 */

const Event = require('./eventSchema');

module.exports.findEventByEventName = (event_name, next) => {
    Event.findOne({eventName: event_name}, {participants: 0}).populate([{path: 'hostingOrganisation', model: 'Organisation'}, {path: 'eventSessions', model: 'Session'}]).exec(next);
};

module.exports.findEventByEventId = (event_id, next) => {
    Event.findOne({eventId: event_id}, {participants: 0}).populate([{path: 'hostingOrganisation', model: 'Organisation'}, {path: 'eventSessions', model: 'Session'}]).exec(next);
};

module.exports.findEventByEventIdWithoutPopulate = (event_id, next) => {
    Event.findOne({eventId: event_id}).exec(next);
};

module.exports.addAnEvent = (name, coordinator_emails, start_date, end_date, location, organisation_id, reg_fees, about, pointOfContacts, faqs, sponsors, event_logo_url, next) => {

    let newEvent = new Event({
        eventName: name,
        eventId: name.toLowerCase().replace(" ", "_"),
        eventStartDate: start_date,
        eventEndDate: end_date,
        eventLocation: location,
        coordinatorEmails: coordinator_emails,
        hostingOrganisation: organisation_id,
        fees: reg_fees,
        pointOfContacts: pointOfContacts,
        faqs: faqs,
        sponsors: sponsors,
        about: about,
        eventLogoUrl: event_logo_url
    });
    newEvent.save(next);

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
    Event.findOneAndUpdate({eventId: event_id}, {$addToSet: {participants: user_id}}).exec(next);
};

module.exports.fetchParticipatedEvents = (user_id, next) => {
    Event.find({participants: user_id}, {participants: 0}).populate([{path: 'hostingOrganisation', model: 'Organisation'}, {path: 'eventSessions', model: 'Session', select: '-_id -sessionId'}]).exec(next);
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

module.exports.addASingleSession = (event_ob_id, session_ob_id, next) => {
    Event.findOneAndUpdate({eventId: event_ob_id}, {$push: {eventSessions: session_ob_id}}).exec(next);
};

// TODO: add a single timetable element
module.exports.addASingleTimetableElement = (event_ob_id, session_ob_id, next) => {
    Event.findOneAndUpdate({eventId: event_ob_id}, {$push: {eventTimetable: session_ob_id}}).exec(next);
};

module.exports.addSessions = (event_ob_id, session_ob_ids, next) => {
    Event.findOneAndUpdate({eventId: event_ob_id}, {$push: {eventSessions: {$each: session_ob_ids}}}).exec(next);
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

module.exports.addASingleSponsor = (event_id, name, img_url, next) => {
    let sponsor = {
        name: name,
        img_url: img_url
    };
    Event.findOneAndUpdate({eventId: event_id}, {$push: {sponsors: sponsor}}).exec(next);
};

module.exports.addSponsors = (event_id, sponsors, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {$push: {sponsors: {$each: sponsors}}}).exec(next);
};

module.exports.findSponsorsOfAnEvent = (event_id, next) => {
    Event.findOne({eventId: event_id}, 'sponsors').exec(next);
};

// Function for adding wifi coupon to a user's profile
module.exports.addWifiCoupons = (event_id, coupons, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {$push: {wifiCoupons: {$each: coupons}}}).exec(next);
};

// Function for finding wifi coupons in an event
module.exports.findWifiCouponsInAnEvent = (event_id, next) => {
    Event.findOneAndUpdate({eventId: event_id}, 'wifiCoupons').exec(next);
};

// Function for adding a scannable id to an event
module.exports.addScannableToAnEvent = (event_id, scannable_id, next) => {
    Event.findOneAndUpdate({eventId: event_id}, {$push: {eventSessionScannables: scannable_id}}).exec(next);
};