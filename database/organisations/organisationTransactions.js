/**
 * Created by Yash 1300 on 21-03-2018.
 */
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Organisation = require('./organisationSchema');

// Function for finding an organisation on the basis of concerned email
module.exports.findOrganisationByConcernedEmail = (email, next) => {
    Organisation.findOne({concernedEmail: email}).exec(next);
};

//Function for finding an organisation on the basis of the ObjectID
module.exports.findOrganisationById = (id, next) => {
    Organisation.findOne({_id: id}, {_id: 0, password: 0}).exec(next);
};

// Function for adding an organisation to the database
module.exports.addOrganisation = (organisation, next) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(organisation.password, salt, null, (err, hash) => {
            if (err)
                return next(err);
            organisation.password = hash;
            organisation.save(next);
        });
    });
};

// Function for comparing a password to that of an organisation
module.exports.comparePassword = (organisation, password, next) => {
    bcrypt.compare(password, organisation.password, (err, correctPassword) => err ? next(err, null) : next(null, correctPassword));
};

// Function for generating a token for an organisation object
module.exports.generateToken = (organisation, secret) => {
    return jwt.sign(JSON.parse(JSON.stringify(organisation)), secret);
};

// Function for verifying a token corresponding to an organisation
module.exports.verifyOrganisationToken = (secret, req, res, next) => {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.json({success: false, message: "An error occurred"});
            }
            if (!decoded)
                return res.json({success: false, message: "Corrupted token provided"});
            this.findOrganisationById(decoded._id, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.json({success: false, message: "An error occured"});
                }
                if (!user)
                    return res.json({success: false, message: "Token doesn't correspond to an organisation"});
                req.decoded = decoded;
                next();
            });
        });
    } else {
        return res.json({success: false, message: "No token provided"});
    }
};

module.exports.addOrModifyOrganisationLogoURL = (org_id, logo_url, next) => {
    Organisation.findOneAndUpdate({_id: org_id}, {orgLogoUrl: logo_url}).exec(next);
};
