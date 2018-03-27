/**
 * Created by abhi on 21-Mar-18.
 */
const router = require('express').Router();
const c_auth = require('../controllers/auth_controller');
const User = require('../database/')

router.post('/user/register', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
    var contact = req.body.contact;

    c_auth.registerUser(name, username, email, password, contact).then((data) => {
        res.json(data);
    }).catch((err) => {
        if (err.success === false)
            res.json(err);
        else
            console.log(err);
    });
}

router.post('/user/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    c_auth.loginUser(email, password).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;