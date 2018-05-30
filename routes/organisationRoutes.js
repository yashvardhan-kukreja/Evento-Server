/**
 * Created by Yash 1300 on 29-03-2018.
 */

const router = require('express').Router();
const OrganisationController = require('../controllers/organisationController');
const OrganisationTransations = require('../database/organisations/organisationTransactions');
try {
    var config = require('../config');
} catch (e) {
    console.log("Using environment variables instead of config variables");
}

const secret = process.env.SECRET || config.SECRET;

router.use((req, res, next) => {
    OrganisationTransations.verifyOrganisationToken(secret, req, res, next);
});

// Route for fetching organisation info
router.get('/fetch/info', (req, res) => {
    let organisation_id = req.decoded._id;
    OrganisationController.fetchOrganisationDetails(organisation_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for hosting an event
router.post('/host-event', (req, res) => {
    let organisation_id = req.decoded._id;
    let name = req.body.event_name;
    let date = req.body.event_date;
    let location = req.body.event_location;
    OrganisationController.hostAnEvent(name, date, location, organisation_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for deleting an event
router.post('/delete-event', (req, res) => {
    let organisation_id = req.decoded._id;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.deleteAnEvent(event_id))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding multiple FAQs in one go
router.post('/add-multiple-faqs', (req, res) => {
    let organisation_id = req.decoded._id;
    let questions = req.body.questions;
    let answers = req.body.answers;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addFaqsToAnEvent(event_id, questions, answers))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding a single FAQ
router.post('/add-faq', (req, res) => {
    let organisation_id = req.decoded._id;
    let question = req.body.question;
    let answer = req.body.answer;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addSingleFaqToAnEvent(event_id, question, answer))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

module.exports = router;