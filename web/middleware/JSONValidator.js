const JOIValidator = require("./JOIValidator");
const HCS = require("http-status-codes");
const togeojson = require("@tmcw/togeojson");
const DOMParser = require("xmldom").DOMParser;

class JSONValidator {
    static checkLogin = (req, res, next) => {
        //Validate json
        const data = req.body;
        const checkValidity = JOIValidator.validateLogin(data);

        //If valid, move on, else give a validation error
        if (checkValidity === true) {
            return next();
        } else {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/login/login_failed_validation`);
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
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/register/register_failed_validation`);
        }
    };

    static checkUserEdit = (req, res, next) => {
        //Validate the user info
        const data = req.body;
        const checkValidity = JOIValidator.validateUser(data);

        //If valid, move on, else give a validation error
        if (checkValidity === true) {
            return next();
        } else {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/account/account_failed_validation`);
        }
    };

    static checkRouteCreate = (req, res, next) => {
        //Validate the route info
        const data = req.body;
        const checkValidity = JOIValidator.validateRoute(data);

        //If valid, move on, else give a validation error
        if (checkValidity === true) {
            return next();
        } else {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/routes-editor/route_failed_validation`);
        }
    };

    static checkGeoJSON = (req, res, next) => {
        //Check if there is a gpx file
        if (!req.hasOwnProperty("file")) {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/routes-editor/no_file`);
        }

        //Get the data from the gpx file, parse to XML and convert to JSON
        const gpxString = Buffer.from(req.file.buffer).toString();
        const gpx = new DOMParser().parseFromString(gpxString);
        const geojson = togeojson.gpx(gpx);

        const checkValidity = JOIValidator.validateGeoJson(geojson);

        //If valid, move on, else give a validation error
        if (checkValidity === true) {
            return next();
        } else {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/routes-editor/route_failed_validation`);
        }
    };
}

module.exports = JSONValidator;
