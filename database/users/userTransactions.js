/**
 * Created by Yash 1300 on 21-03-2018.
 */
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const aes256 = require('aes256');

const User = require('./userSchema');

// Function returning a user object corresponding to the provided username or email
module.exports.findUserByUsernameOrEmail = (input, next) => {
    User.findOne({$or: [{username: input}, {email: input}]}).exec(next);
};

//Function returning a user object corresponding to the provided ObjectID
module.exports.findUserById = (id, next) => {
    User.findOne({_id: id}, {password: 0}).exec(next);
};

// Function for adding a user to the database
module.exports.addUser = (user, next) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            user.save(next);
        });

    });
};

// Function for comparing password for a user object
module.exports.comparePassword = (user, password, next) => {
    bcrypt.compare(password, user.password, (err, correctPassword) => err ? next(err, null) : next(null, correctPassword));
};

// Function for generating a token for a user object
module.exports.generateToken = (user, secret) => {
    return jwt.sign(JSON.parse(JSON.stringify(user)), secret);
};

// Function for decoding a jwt
module.exports.decodeToken = (token, secret, next) => {
    jwt.verify(token, secret, next);
};

// Function for encrypting the user_id and event_id using AES
module.exports.encryptUserAndEventIdAES = (secret, user_id, event_id) => {
    return aes256.encrypt(secret, user_id+" "+event_id);
};

// Function for decrypting the user_id and event_id using AES
module.exports.decryptUserAndEventIdAES = (secret, encrypted_form) => {
    return aes256.decrypt(secret, encrypted_form);
};

// Function for verifying a token corresponding to a user
module.exports.verifyUserToken = (secret, req, res, next) => {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
        this.decodeToken(token, secret, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.json({success: false, message: "An error occurred"});
            }
            if (!decoded)
                return res.json({success: false, message: "Corrupted token provided"});
            this.findUserById(decoded._id, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.json({success: false, message: "An error occured"});
                }
                if (!user)
                    return res.json({success: false, message: "Token doesn't correspond to a user"});
                req.decoded = decoded;
                next();
            });
        });
    } else {
        return res.json({success: false, message: "No token provided"});
    }
};

// Function for adding wifi coupon to a user's profile
module.exports.addWifiCoupon = (user_id, coupon_id, coupon_password, event_id, next) => {
    let coupon = {
        coupon_id : coupon_id,
        coupon_password: coupon_password,
        event_id: event_id
    };
    User.findOneAndUpdate({_id: user_id}, {$push: {wifiCouponHistory: coupon}}).exec(next);
};

// Function for finding wifi coupon for an event in user's profile
module.exports.findWifiCoupons = (user_id, next) => {
    User.findOne({_id: user_id}, 'wifiCouponHistory').exec(next);
};