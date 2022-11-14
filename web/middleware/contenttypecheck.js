const JSONValidation = require("./JSONValidation");
const XMLValidation = require('./XMLValidation');
const StatusCodes = require("http-status-codes");
const XMLRefactor = require("./XMLRefactors");

class ContentTypeCheck {
    static checkLogin = (req, res, next) => {
        if (req.is('application/xml')) {
            try {
                if (XMLValidation.validateLogin(req, res, next)) {
                    return next();
                }
            } catch (e) {
                const xmlres = XMLRefactor.apiErrorBuilder(400, 'Data validation failed');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            }
        } else {
            try {
                if (JSONValidation.validateLogin(req)) {
                    return next();
                }
            } catch (e) {
                return res.status(StatusCodes.BAD_REQUEST).send({err: 'Data validation failed'});
            }
         }
    }

    static checkRegister = (req, res, next) => {
        if (req.is('application/xml')) {
            try {
                if (XMLValidation.validateRegister(req, res, next)) {
                    return next();
                }
            } catch (e) {
                const xmlres = XMLRefactor.apiErrorBuilder(400, 'Data validation failed');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            }
        } else {
            try {
                if (JSONValidation.validateRegister(req)) {
                    return next();
                }
            } catch (e) {
                return res.status(StatusCodes.BAD_REQUEST).send({err: 'Data validation failed'});
            }
        }
    }

    static checkUserEdit = (req, res, next) => {
        if(req.is('application/xml')) {
            try {
                if (XMLValidation.validateEdit(req, res, next)) {
                    return next();
                }
            } catch (e) {
                const xmlres = XMLRefactor.apiErrorBuilder(400, 'Data validation failed');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            }
        } else {
            try {
                if (JSONValidation.validateEdit(req)) {
                    return next();
                }
            } catch (e) {
                return res.status(StatusCodes.BAD_REQUEST).send({err: 'Data validation failed'});
            }
        }
    }

    static checkGeofenceCreate = (req, res, next) => {
        if(req.is('application/xml')) {
            try {
                if (XMLValidation.validateGeofence(req, res, next)) {
                    return next();
                }
            } catch (e) {
                const xmlres = XMLRefactor.apiErrorBuilder(400, 'Data validation failed');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            }
        } else {
            try {
                if (JSONValidation.validateGeofence(req)) {
                    return next();
                }
            } catch (e) {
                return res.status(StatusCodes.BAD_REQUEST).send({err: 'Data validation failed'});
            }
        }
    }

    static checkGeofenceEdit = (req, res, next) => {
        if(req.is('application/xml')) {
            try {
                if (XMLValidation.validateGeofence(req, res, next)) {
                    return next();
                }
            } catch (e) {
                const xmlres = XMLRefactor.apiErrorBuilder(400, 'Data validation failed');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            }
        } else {
            try {
                if (JSONValidation.validateGeofence(req)) {
                    return next();
                }
            } catch (e) {
                return res.status(StatusCodes.BAD_REQUEST).send({err: 'Data validation failed'});
            }
        }
    }

    static checkRouteCreate = (req, res, next) => {
        if(req.is('application/xml')) {
            try {
                if (XMLValidation.validateCreateRoute(req, res, next)) {
                    return next();
                }
            } catch (e) {
                const xmlres = XMLRefactor.apiErrorBuilder(400, 'Data validation failed');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            }
        } else {
            try {
                if (JSONValidation.validateCreateRoute(req)) {
                    return next();
                }
            } catch (e) {
                console.log(e)
                return res.status(StatusCodes.BAD_REQUEST).send({err: 'Data validation failed'});
            }
        }
    }
}

module.exports = ContentTypeCheck;