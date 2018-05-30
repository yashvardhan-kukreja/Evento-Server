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
    let reg_fees_amount = req.body.reg_fees_amount;
    let reg_fees_description = req.body.reg_fees_description;
    let about = req.body.about;
    OrganisationController.hostAnEvent(name, date, location, organisation_id, reg_fees_amount, reg_fees_description, about).then(data => res.json(data)).catch(err => res.json(err));
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
router.post('/event/add-multiple-faqs', (req, res) => {
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
router.post('/event/add-faq', (req, res) => {
    let organisation_id = req.decoded._id;
    let question = req.body.question;
    let answer = req.body.answer;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addSingleFaqToAnEvent(event_id, question, answer))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding multiple speakers in one go
router.post('/event/add-multiple-speakers', (req, res) => {
    let organisation_id = req.decoded._id;
    let names = req.body.names;
    let descriptions = req.body.descriptions;
    let img_urls = req.body.img_urls;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addSpeakersToAnEvent(event_id, names, descriptions, img_urls))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding a single speaker
router.post('/event/add-speaker', (req, res) => {
    let organisation_id = req.decoded._id;
    let name = req.body.name;
    let description = req.body.description;
    let img_url = req.body.img_url;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addSingleSpeakerToAnEvent(event_id, name, description, img_url))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding fees to the event
router.post('/event/add-fees', (req, res) => {
    let organisation_id = req.decoded._id;
    let amount = req.body.amount;
    let description = req.body.description;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addFeesToTheEvent(event_id, amount, description))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for modifying the 'about' of the event
router.post('/event/modify-about', (req, res) => {
    let organisation_id = req.decoded._id;
    let about = req.body.about;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.modifyAboutOfTheEvent(event_id, about))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

module.exports = router;