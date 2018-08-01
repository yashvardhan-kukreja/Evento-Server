/**
 * Created by Yash 1300 on 28-05-2018.
 */

const router = require('express').Router();
const EventController = require('../controllers/eventController');

// Route for fetching the event info
router.get('/info', (req, res) => {
    let event_id = req.query.event;
    EventController.fetchEventDetails(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the participants of an event
router.post('/fetch/participants', (req, res) => {
    let event_id = req.body.event_id;
    EventController.listOfParticipantsForEvent(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the FAQs of an event
router.get('/faqs', (req, res) => {
    let event_id = req.query.event;
    EventController.fetchFaqs(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the participants of a session
router.post('/session/fetch/participants', (req, res) => {
    let session_obj_id = req.body.session_obj_id;
    EventController.fetchParticipantsPresentInASession(session_obj_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the timetable for an event
router.get('/timeline', (req, res) => {
    let event_id = req.query.event;
    EventController.fetchTimelineOfAnEvent(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

router.get('/scannables', (req, res) => {
    let event_id = req.query.event;
    EventController.fetchScannablesOfAnEvent(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the session in an event
router.get('/sessions', (req, res) => {
    let event_id = req.query.event;
    EventController.fetchSessionsOfAnEvent(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the sponsors in an event
router.get('/sponsors', (req, res) => {
    let event_id = req.query.event;
    EventController.fetchSponsorsOfAnEvent(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

module.exports = router;
