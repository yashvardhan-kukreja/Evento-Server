/**
 * Created by Yash 1300 on 21-03-2018.
 */
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('./userSchema');

// Function returning a user object corresponding to the provided username or email
module.exports.findUserByUsernameOrEmail = (input, next) => {
    User.findOne({$or: [{username: input}, {email: input}]}).exec(next);
};

//Function returning a user object corresponding to the provided ObjectID
module.exports.findUserById = (id, next) => {
    User.findOne({_id: id}, {_id: 0, password: 0}).exec(next);
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
