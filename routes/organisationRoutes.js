/**
 * Created by Yash 1300 on 29-03-2018.
 */

const router = require('express').Router();
const organisationController = require('../controllers/organisationController');
const organisationTransations = require('../database/organisations/organisationTransactions');

const secret = process.env.SECRET;

router.use((req, res, next) => {
    organisationTransations.verifyOrganisationToken(secret, req, res, next);
});

router.get('/fetchDetails', (req, res) => {
    const id = req.decoded._id;
    organisationController.getOrganisationDetails(id).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;