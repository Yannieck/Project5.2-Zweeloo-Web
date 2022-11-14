const validator = require('xsd-schema-validator');
const path = require('path');
const XMLRefactor = require("./XMLRefactors");

class XMLValidation {
    static validateLogin = (req, res, next) => {
        validator.validateXML(req.rawBody, path.join(__dirname, '../validation/xsd/login.xsd'), (err) => {
            if (err) {
                console.log(err)
                const xmlres = XMLRefactor.errorBuilder(400, 'Data validation failed', '/login');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return next();
            }
        });
    }

    static validateRegister = (req, res, next) => {
        validator.validateXML(req.rawBody, path.join(__dirname, '../validation/xsd/register.xsd'), (err) => {
            if (err) {
                console.log(err)
                const xmlres = XMLRefactor.errorBuilder(400, 'Data validation failed', '/register');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return next();
            }
        });
    }

    static validateEdit = (req, res, next) => {
        validator.validateXML(req.rawBody, path.join(__dirname, '../validation/xsd/edituser.xsd'), (err) => {
            if (err) {
                console.log(err)
                const xmlres = XMLRefactor.apiErrorBuilder(400, 'Data validation failed');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return next();
            }
        });
    }

    static validateGeofence = (req, res, next) => {
        validator.validateXML(req.rawBody, path.join(__dirname, '../validation/xsd/geofence.xsd'), (err) => {
            if (err) {
                console.log(err)
                const xmlres = XMLRefactor.apiErrorBuilder(400, 'Data validation failed');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return next();
            }
        });
    }

    static validateCreateRoute = (req, res, next) => {
        validator.validateXML(req.rawBody, path.join(__dirname, '../validation/xsd/createRoute.xsd'), (err) => {
            if (err) {
                console.log(err)
                const xmlres = XMLRefactor.apiErrorBuilder(400, 'Data validation failed');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return next();
            }
        });
    }
}

module.exports = XMLValidation;