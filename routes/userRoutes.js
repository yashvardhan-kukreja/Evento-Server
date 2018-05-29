/**
 * Created by Yash 1300 on 29-03-2018.
 */

const router = require('express').Router();
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

router.get('/fetch/personal-info', (req, res) => {
    let user_id = req.decoded._id;
    UserController.getUserDetails(user_id).then(data => res.json(data)).catch(err => res.json(err));
});

router.get('/fetch/participated-events', (req, res) => {
    let user_id = req.decoded._id;
    UserController.fetchParticipatedEvents(user_id).then(data => res.json(data)).catch(err => res.json(err));
});

router.post('/participate', (req, res) => {
    let user_id = req.decoded._id;
    let event_id = req.body.event_id;
    UserController.registerToAnEvent(user_id, event_id).then(data => res.json(data)).catch(err => res.json(err));
});

router.post('/verification', (req, res) => {
    let user_id = req.decoded._id;
    let event_id = req.body.event_id;
    EventController.verifyParticipantForAnEvent(user_id, event_id).then(data => res.json(data)).catch(err => res.json(err));
});

module.exports = router;