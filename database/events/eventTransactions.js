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

module.exports.addAnEvent = (name, date, location, organisation_id, next) => {
    let newEvent = new Event({
        eventName: name,
        eventDate: date,
        eventLocation: location,
        hostingOrganisation: organisation_id
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