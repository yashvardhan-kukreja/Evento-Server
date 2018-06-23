/**
 * Created by Yash 1300 on 21-03-2018.
 */

const Event = require('./eventSchema');

module.exports.findEventByEventName = (event_name, next) => {
    Event.findOne({eventName: event_name}, {participants: 0}).populate({path: 'hostingOrganisation', model: 'Organisation'}).exec(next);
};

module.exports.findEventByEventId = (event_id, next) => {
    Event.findOne({_id: event_id}, {participants: 0}).populate({path: 'hostingOrganisation', model: 'Organisation'}).exec(next);
};

module.exports.addAnEvent = (name, start_date, end_date, location, organisation_id, reg_fees, about, pointOfContacts, next) => {
    let newEvent = new Event({
        eventName: name,
        eventId: name.toLowerCase().replace(" ", "_"),
        eventStartDate: start_date,
        eventEndDate: end_date,
        eventLocation: location,
        hostingOrganisation: organisation_id,
        fees: reg_fees,
        pointOfContacts: pointOfContacts,
        about: about
    });
    newEvent.save(next);
};

module.exports.findParticipantsOfAnEvent = (event_id, next) => {
    Event.findOne({_id: event_id}, 'participants').populate({path: 'participants', model: 'User'}).exec(next);
};

module.exports.findParticipantIdsOfAnEvent = (event_id, next) => {
    Event.findOne({_id: event_id}, 'participants').exec(next);
};

module.exports.deleteEventByEventName = (event_name, next) => {
    Event.findOneAndRemove({eventName: event_name}).exec(next);
};

module.exports.deleteEventByEventId = (event_id, next) => {
    Event.findOneAndRemove({_id: event_id}).exec(next);
};

module.exports.addUserToAnEvent = (event_id, user_id, next) => {
    Event.findOneAndUpdate({_id: event_id}, {$push: {participants: user_id}}).exec(next);
};

module.exports.fetchParticipatedEvents = (user_id, next) => {
    Event.find({participants: user_id}, {participants: 0}).populate({path: 'hostingOrganisation', model: 'Organisation'}).exec(next);
};

module.exports.addFaqs = (event_id, faqs, next) => {
    Event.findOneAndUpdate({_id: event_id}, {$push: {faqs: {$each: faqs}}}).exec(next);
};

module.exports.addASingleFAQ = (event_id, question, answer, next) => {
    let faq = {
        question: question,
        answer: answer
    };
    Event.findOneAndUpdate({_id: event_id}, {$push: {faqs: faq}}).exec(next);
};

module.exports.fetchFaqs = (event_id, next) => {
    Event.findOne({_id: event_id}, 'faqs').exec(next);
};

module.exports.addASingleSpeaker = (event_id, name, description, img_url, next) => {
    let speaker = {
        name: name,
        description: description,
        image_url: img_url
    };
    Event.findOneAndUpdate({_id: event_id}, {$push: {speakers: speaker}}).exec(next);
};

module.exports.addSpeakers = (event_id, speakers, next) => {
    Event.findOneAndUpdate({_id: event_id}, {$push: {speakers: {$each: speakers}}}).exec(next);
};

module.exports.addASingleRegFeesTotheEvent = (event_id, amount, description, next) => {
    let fees = {
        amount: amount,
        description: description
    };
    Event.findOneAndUpdate({_id: event_id}, {$push: {fees: fees}}).exec(next);
};

module.exports.modifyAboutOfTheEvent = (event_id, about, next) => {
    Event.findOneAndUpdate({_id: event_id}, {about: about}).exec(next);
};

module.exports.addPointOfContacts = (event_id, contacts, next) => {
    Event.findOneAndUpdate({_id: event_id}, {$push: {pointOfContacts: {$each: contacts}}}).exec(next);
};

module.exports.addASinglePointOfContact = (event_id, name, email, contact_number, next) => {
    let poc = {
        name: name,
        email: email,
        contact: contact_number
    };
    Event.findOneAndUpdate({_id: event_id}, {$push: {pointOfContacts: poc}}).exec(next);
};