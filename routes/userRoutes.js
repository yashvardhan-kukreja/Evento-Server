/**
 * Created by Yash 1300 on 29-03-2018.
 */

const router = require('express').Router();
const User = require('../database/users/userSchema');
const userTransations = require('../database/users/userTransactions');

const secret = process.env.SECRET;

router.use((req, res, next) => {
    userTransations.verifyUserToken(secret, req, res, next);
});

module.exports = router;