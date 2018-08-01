/**
 * Created by Yash 1300 on 29-03-2018.
 */

const router = require('express').Router();
const OrganisationController = require('../controllers/organisationController');
const OrganisationTransactions = require('../database/organisations/organisationTransactions');

const secret = process.env.SECRET;

router.use((req, res, next) => {
    OrganisationTransactions.verifyOrganisationToken(secret, req, res, next);
});

// Route for fetching organisation info
router.get('/info', (req, res) => {
    let organisation_id = req.decoded._id;
    OrganisationController.fetchOrganisationDetails(organisation_id).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for adding/modifying the organisation logo
router.put('/logo', (req, res) => {
    let organisation_id = req.decoded._id;
    let org_logo_url = req.body.org_logo_url;
    OrganisationController.addOrModifyOrganisationLogoURL(organisation_id, org_logo_url).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for hosting an event
router.post('/host-event', (req, res) => {
    let organisation_id = req.decoded._id;
    let name = req.body.event_name;
    let coordinator_emails = req.body.coordinator_emails;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let location = req.body.event_location;
    let reg_fees = req.body.reg_fees;
    let point_of_contacts = req.body.point_of_contacts;
    let about = req.body.about;
    let faqs = req.body.faqs;
    let sponsors = req.body.sponsors;
    let event_logo_url = req.body.event_logo_url;
    OrganisationController.hostAnEvent(name, coordinator_emails, start_date, end_date, location, organisation_id, reg_fees, about, point_of_contacts, faqs, sponsors, event_logo_url).then(data => res.json(data)).catch(err => res.json(err));
});

// Route for deleting an event
router.delete('/event', (req, res) => {
    let organisation_id = req.decoded._id;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.deleteAnEvent(event_id))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding one or more FAQs in one go
router.post('/event/add-faqs', (req, res) => {
    let organisation_id = req.decoded._id;
    let questions = req.body.questions || req.body.question;
    let answers = req.body.answers || req.body.answer;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addFaqsToAnEvent(event_id, questions, answers))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding one or more speakers in one go
router.post('/event/add-speakers', (req, res) => {
    let organisation_id = req.decoded._id;
    let names = req.body.names || req.body.name;
    let descriptions = req.body.descriptions || req.body.description;
    let img_urls = req.body.img_urls || req.body.img_url;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addSpeakersToAnEvent(event_id, names, descriptions, img_urls))
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
router.put('/event/about', (req, res) => {
    let organisation_id = req.decoded._id;
    let about = req.body.about;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.modifyAboutOfTheEvent(event_id, about))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding Point of Contacts in an event
router.post('/event/add-pocs', (req, res) => {
    let organisation_id = req.decoded._id;
    let names = req.body.names || req.body.name;
    let contacts = req.body.contacts || req.body.contact;
    let emails = req.body.emails || req.body.email;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addPointOfContacts(event_id, names, contacts, emails))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding Coordinators to an event
router.post('/event/add-coordinators', (req, res) => {
    let organisation_id = req.decoded._id;
    let coordinator_emails = req.body.coordinator_emails || req.body.coordinator_email;
    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addCoordinators(event_id, coordinator_emails))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding a single session to an event
router.post('/event/add-single-session', (req, res) => {
    let organisation_id = req.decoded._id;
    let event_id = req.body.event_id;
    let names = req.body.name;
    let locations = req.body.location;
    let dates = req.body.date;
    let start_times = req.body.start_time;
    let end_times = req.body.end_time;
    let types = req.body.type;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addSessions(event_id, names, locations, start_times, end_times, dates, types))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding sponsors to an event
router.post('/event/add-sponsors', (req, res) => {
    let organisation_id = req.decoded._id;
    let event_id = req.body.event_id;
    let names = req.body.names || req.body.name;
    let img_urls = req.body.img_urls || req.body.img_url;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addSponsorsToAnEvent(event_id, names, img_urls))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding multiple wifi coupons to an event
router.post('/event/add-wifi-coupons', (req, res) => {
    let organisation_id = req.decoded._id;
    let coupon_ids = "";
    let coupon_passwords = "";

    if (typeof (req.body.coupon_ids) === 'string') {
        coupon_ids = [req.body.coupon_ids];
        coupon_passwords = [req.body.coupon_passwords];
    } else {
        coupon_ids = req.body.coupon_ids;
        coupon_passwords = req.body.coupon_passwords;
    }


    let event_id = req.body.event_id;
    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addWifiCouponsToAnEvent(event_id, coupon_ids, coupon_passwords))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

// Route for adding a single event scannable session to an event
router.post('/event/add-scannable-session', (req, res) => {
    let organisation_id = req.decoded._id;
    let event_id = req.body.event_id;
    let scannable_name = req.body.scannable_name;
    let scannable_description = req.body.scannable_description;
    let scannable_type = req.body.scannable_type;

    OrganisationController.authorizeOrganisationForAnEvent(event_id, organisation_id)
        .then(ifAuthorized => OrganisationController.addScannable(scannable_name, scannable_description, scannable_type, event_id))
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

module.exports = router;