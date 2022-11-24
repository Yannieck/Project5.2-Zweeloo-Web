const JOIValidator = require("./JOIValidator");
const HCS = require("http-status-codes");

class ContentTypeCheck {
    static checkLogin = (req, res, next) => {
        //Validate json
        const data = req.body;
        const checkValidity = JOIValidator.validateLogin(data);

        //If valid, move on, else give a validation error
        if (checkValidity === true) {
            return next();
        } else {
            return res.status(HCS.StatusCodes.BAD_REQUEST).redirect(`/login/login_failed_validation`);
        }
    };

    static checkRegister = (req, res, next) => {
        //Validate the register info
        const data = req.body;
        const checkValidity = JOIValidator.validateRegister(data);

        //If valid, move on, else give a validation error
        if (checkValidity === true) {
            return next();
        } else {
            return res.status(HCS.StatusCodes.BAD_REQUEST).redirect(`/register/register_failed_validation`);
        }
    };

    static checkUserEdit = (req, res, next) => {
        try {
            if (JOIValidator.validateUser(req)) {
                return next();
            }
        } catch (e) {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .send({ err: "Data validation failed" });
        }
    };

    static checkRouteCreate = (req, res, next) => {
        try {
            if (JOIValidator.validateRoute(req)) {
                return next();
            }
        } catch (e) {
            console.log(e);
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .send({ err: "Data validation failed" });
        }
    };
}

module.exports = ContentTypeCheck;
