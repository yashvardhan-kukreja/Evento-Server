/**
 * Created by Yash 1300 on 21-03-2018.
 */
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Organisation = require('./organisationSchema');

// Function for finding an organisation on the basis of concerned email
module.exports.findOrganisationByConcernedEmail = (email) => {
    Organisation.findOne({concernedEmail: email}).exec((err, outputOrganisaction) => {
        if (err)
            return false;
        else {
            if (!outputOrganisaction)
                return false;
            else
                return outputOrganisaction;
        }
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

