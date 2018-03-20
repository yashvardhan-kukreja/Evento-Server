/**
 * Created by abhi on 21-Mar-18.
 */
const router = require('express').Router();
const c_auth = require('../controllers/auth_controller');


router.post('/register', (req, res) => {
    var uname       = req.body.uname;
    var passwd      = req.body.passwd;

        if (uname == null || uname == '' || passwd == '' || passwd == null) {
             return res.json({success: false, message: 'Ensure username and password were provided'});}
        else {
                c_auth.get_register(uname, password).then(data => { console.log(data);})
            }
    });

module.exports = router;