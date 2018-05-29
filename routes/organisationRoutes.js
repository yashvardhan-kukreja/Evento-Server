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

router.get('/fetch/info', (req, res) => {
    let id = req.decoded._id;
    console.log(req.decoded._id);
    OrganisationController.getOrganisationDetails(id).then(data => res.json(data)).catch(err => res.json(err));
});

router.post('/host-event', (req, res) => {
    let id = req.decoded._id;
    let name = req.body.event_name;
    let date = req.body.event_date;
    let location = req.body.event_location;
    OrganisationController.hostAnEvent(name, date, location, id).then(data => res.json(data)).catch(err => res.json(err));
});

router.post('/delete-event', (req, res) => {
    let organisation_id = req.decoded._id;
    let event_id = req.body.event_id;
    OrganisationController.deleteAnEvent(event_id, organisation_id).then(data => res.json(data)).catch(err => res.json(err));
});

module.exports = router;