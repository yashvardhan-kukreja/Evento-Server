/**
 * Created by Yash 1300 on 29-03-2018.
 */

const router = require('express').Router();
const userController = require('../controllers/userController');
const userTransations = require('../database/users/userTransactions');

const secret = process.env.SECRET;

router.use((req, res, next) => {
    userTransations.verifyUserToken(secret, req, res, next);
});

router.get('/userDetails', (req, res) => {
    const id = req.decoded._id;
    userController.getUserDetails(id).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;