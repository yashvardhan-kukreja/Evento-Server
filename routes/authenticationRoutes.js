/**
 * Created by abhi on 21-Mar-18.
 */
const router = require('express').Router();
const AuthController = require('../controllers/authController');
const User = require('../database/users/userSchema');

router.post('/user/register', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let contact = req.body.contact;
    AuthController.registerUser(name, username, email, password, contact).then(data => res.json(data)).catch(err => res.json(err));
});

router.post('/user/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    AuthController.loginUser(email, password).then(data => res.json(data)).catch(err => res.json(err));
});

router.post('/organisation/register', (req, res) => {
    let name = req.body.name;
    let college = req.body.college;
    let email = req.body.email;
    let contact = req.body.contact;
    let password =req.body.password;
    AuthController.registerOrganisation(name, college, email, contact, password).then(data => res.json(data)).catch((err) => res.json(err));
});

router.post('/organisation/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    AuthController.loginOrganisation(email, password).then(data => res.json(data)).catch(err => res.json(err));
});

module.exports = router;