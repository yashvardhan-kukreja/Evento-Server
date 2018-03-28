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
module.exports.comparePassword = (organisation, password) => {
    return bcrypt.compareSync(password, organisation.password);
};

// Function for generating a token for an organisation object
module.exports.generateToken = (organisation, secret) => {
    return jwt.sign(JSON.parse(JSON.stringify(organisation)), secret);
};

