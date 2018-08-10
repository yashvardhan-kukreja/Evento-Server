/**
 * Created by Yash 1300 on 27-07-2018.
 */

const Scannable = require('./scannableSchema');

module.exports.findScannableByScannableId = (scannable_id, next) => {
    Scannable.findOne({_id: scannable_id}).exec(next);
};

module.exports.addAScannable = (name, description, type, event_id, next) => {
    let scannable = new Scannable({
        name: name,
        description: description,
        scannableType: type,
        eventId: event_id
    });
    scannable.save(next);
};

module.exports.fetchAllScannablesOfAnEvent = (event_id, next) => {
    Scannable.find({eventId: event_id}).exec(next);
};

module.exports.addAParticipantToAScannable = (scannable_id, participant_id, next) => {
    Scannable.findOneAndUpdate({_id: scannable_id}, {$push: {participantsPresent: participant_id}}).exec(next);
};

module.exports.findAllParticipantsOfAScannable = (scannable_id, next) => {
    Scannable.findOne({_id: scannable_id}, 'participantsPresent').exec(next);
};