const JSONValidation = require("./JSONValidation");
const XMLValidation = require("./XMLValidation");
const HCS = require("http-status-codes");
const XMLRefactor = require("./XMLRefactors");

const JOIValidator = require("./JOIValidator");

class ContentTypeCheck {
    static checkLogin = (req, res, next) => {
        //Validate json
        const data = req.body;
        const checkValidity = JOIValidator.validateLogin(data);

        //If valid move to the next handler
        if (checkValidity === true) {
            return next();
        } else {
            //Return an error with code 400
            return res.status(HCS.StatusCodes.BAD_REQUEST).json({
                redirect: "/login",
                message: "Data validation failed",
            });
        }
    };

    static checkRegister = (req, res, next) => {
        const data = req.body;
        const checkValidity = JOIValidator.validateRegister(data);

        if (checkValidity === true) {
            return next();
        } else {
            return res.status(HCS.StatusCodes.BAD_REQUEST).json({
                redirect: "/register",
                message: "Data validation failed",
            });
        }
    };

    static checkUserEdit = (req, res, next) => {
        if (req.is("application/xml")) {
            try {
                if (XMLValidation.validateEdit(req, res, next)) {
                    return next();
                }
            } catch (e) {
                const xmlres = XMLRefactor.apiErrorBuilder(
                    400,
                    "Data validation failed"
                );
                return res.set("Content-Type", "application/xml").send(xmlres);
            }
        } else {
            try {
                if (JSONValidation.validateEdit(req)) {
                    return next();
                }
            } catch (e) {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .send({ err: "Data validation failed" });
            }
        }
    };

    static checkGeofenceCreate = (req, res, next) => {
        if (req.is("application/xml")) {
            try {
                if (XMLValidation.validateGeofence(req, res, next)) {
                    return next();
                }
            } catch (e) {
                const xmlres = XMLRefactor.apiErrorBuilder(
                    400,
                    "Data validation failed"
                );
                return res.set("Content-Type", "application/xml").send(xmlres);
            }
        } else {
            try {
                if (JSONValidation.validateGeofence(req)) {
                    return next();
                }
            } catch (e) {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .send({ err: "Data validation failed" });
            }
        }
    };

    static checkGeofenceEdit = (req, res, next) => {
        if (req.is("application/xml")) {
            try {
                if (XMLValidation.validateGeofence(req, res, next)) {
                    return next();
                }
            } catch (e) {
                const xmlres = XMLRefactor.apiErrorBuilder(
                    400,
                    "Data validation failed"
                );
                return res.set("Content-Type", "application/xml").send(xmlres);
            }
        } else {
            try {
                if (JSONValidation.validateGeofence(req)) {
                    return next();
                }
            } catch (e) {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .send({ err: "Data validation failed" });
            }
        }
    };

    static checkRouteCreate = (req, res, next) => {
        if (req.is("application/xml")) {
            try {
                if (XMLValidation.validateCreateRoute(req, res, next)) {
                    return next();
                }
            } catch (e) {
                const xmlres = XMLRefactor.apiErrorBuilder(
                    400,
                    "Data validation failed"
                );
                return res.set("Content-Type", "application/xml").send(xmlres);
            }
        } else {
            try {
                if (JSONValidation.validateCreateRoute(req)) {
                    return next();
                }
            } catch (e) {
                console.log(e);
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .send({ err: "Data validation failed" });
            }
        }
    };
}

module.exports = ContentTypeCheck;
