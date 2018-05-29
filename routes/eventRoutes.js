/**
 * Created by Yash 1300 on 28-05-2018.
 */

const router = require('express').Router();
const EventController = require('../controllers/eventController');

router.post('/fetch/info', (req, res) => {
    let event_id = req.body.event_id;
    EventController.fetchEventDetails(event_id).then(data => res.json(data)).catch(err => res.json(err));
});

module.exports = router;
