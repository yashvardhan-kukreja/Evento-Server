/**
 * Created by Yash 1300 on 29-03-2018.
 */

const router = require('express').Router();
const Organisation = require('../database/organisations/organisationSchema');
const organisationTransations = require('../database/organisations/organisationTransactions');

const secret = process.env.SECRET;

router.use((req, res, next) => {
    organisationTransations.verifyOrganisationToken(secret, req, res, next);
});

module.exports = router;