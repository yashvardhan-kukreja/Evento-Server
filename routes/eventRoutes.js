/**
 * Created by Yash 1300 on 28-05-2018.
 */

const router = require('express').Router();
const EventController = require('../controllers/eventController');

// Route for fetching the event info
router.post('/fetch/info', (req, res) => {
    let event_id = req.body.event_id;
    EventController.fetchEventDetails(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for fetching the FAQs of an event
router.post('/fetch/faqs', (req, res) => {
    let event_id = req.body.event_id;
    EventController.fetchFaqs(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

module.exports = router;
