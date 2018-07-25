/**
 * Created by Yash 1300 on 29-03-2018.
 */

const router = require('express').Router();
const coord_router = require('express').Router();
const UserController = require('../controllers/userController');
const EventController = require('../controllers/eventController');
const UserTransations = require('../database/users/userTransactions');
try {
    var config = require('../config');
} catch (e) {
    console.log("Using environment variables instead of config variables");
}

const secret = process.env.SECRET || config.SECRET;

router.use((req, res, next) => {
    UserTransations.verifyUserToken(secret, req, res, next);
});

// Route for fetching user's info
router.get('/fetch/personal-info', (req, res) => {
    let user_id = req.decoded._id;
    UserController.fetchUserDetails(user_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the list of events in which the given user participated
router.get('/fetch/participated-events', (req, res) => {
    let user_id = req.decoded._id;
    UserController.fetchParticipatedEvents(user_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for participating a user in an event
router.post('/participate', (req, res) => {
    let user_id = req.decoded._id;
    let event_id = req.body.event_id;
    UserController.registerToAnEvent(user_id, event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for verifying whether the given user is a participant of the event or not
router.post('/verification', (req, res) => {
    let user_id = req.decoded._id;
    let user_email = req.decoded.email;
    let event_id = req.body.event_id;
    EventController.verifyParticipantOrCoordinatorForAnEvent(user_id, user_email, event_id, secret).then(data => res.json(data)).catch(err => res.json(err));
});

/**
 * Routes involving coordinator verification
 */

coord_router.use((req, res, next) => {
    UserTransations.verifyUserToken(secret, req, res, next);
});

// Route for marking a participant as present
coord_router.post('/mark-attendance', (req, res) => {
    let coordinator_email_id = req.decoded.email;
    let session_obj_id = req.body.session_obj_id;
    let qr_code = req.body.qr_code;

    let decrypted_form = UserTransations.decryptUserAndEventIdAES(secret, qr_code);
    let participant_id = decrypted_form.split(" ")[0];
    let event_id = decrypted_form.split(" ")[1];

    UserController.verifyCoordinator(event_id, coordinator_email_id)
        .then(ifAuthorized => UserController.scanQrAndMarkPresent(session_obj_id, participant_id))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for providing wifi coupon to a participant
coord_router.post('/allocate-wifi-coupon', (req, res) => {
    let coordinator_email_id = req.decoded.email;
    let qr_code = req.body.qr_code;

    let decrypted_form = UserTransations.decryptUserAndEventIdAES(secret, qr_code);
    let participant_id = decrypted_form.split(" ")[0];
    let event_id = decrypted_form.split(" ")[1];

    UserController.verifyCoordinator(event_id, coordinator_email_id, participant_id)
        .then(ifAuthorized => UserController.checkAndAddWifiCoupon(participant_id, event_id))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

module.exports = {
    user_router: router,
    coordinator_router: coord_router
};