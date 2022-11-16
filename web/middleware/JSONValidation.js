const Ajv = require('ajv');
const addFormats = require('ajv-formats')
const loginschema = require('../validation/json/login.json');
const registerschema = require('../validation/json/register.json');
const routeschema = require('../validation/json/route.json');
const createrouteschema = require('../validation/json/createroute.json');
const geofenceschema = require('../validation/json/geofence.json');
const edituserschema = require('../validation/json/edituser.json');

// const JOIValidator = require("./JOIValidator");
const ajv = new Ajv();
addFormats(ajv);

class JSONValidation {
    // static validateLogin = (req, res) => {
    //     const data = req.body;
    //     const valid = JOIValidator.validateLogin(data);

    //     if(!valid) {
    //         return res.json(validate.errors[0].message);
    //     } else {
    //         return true;
    //     }
    // }

    static validateRegister = (req, res) => {
        const data = req.body;
        const validate =  ajv.compile(registerschema);
        const valid = validate(data);

        if(!valid) {
            return res.json(validate.errors[0].message);
        } else {
            return true;
        }
    }

    static validateRoute = (req, res) => {
        const data = req.body;
        const validate =  ajv.compile(routeschema);
        const valid = validate(data);

        if(!valid) {
            return res.json(validate.errors[0].message);
        } else {
            return true;
        }
    }

    static validateCreateRoute = (req, res) => {
        const data = req.body;
        const validate =  ajv.compile(createrouteschema);
        const valid = validate(data);

        if(!valid) {
            console.log(validate.errors[0].message)
            return res.json(validate.errors[0].message);
        } else {
            return true;
        }
    }

    static validateGeofence = (req, res) => {
        const data = req.body;
        const validate =  ajv.compile(geofenceschema);
        const valid = validate(data);

        if(!valid) {
            return res.json(validate.errors[0].message);
        } else {
            return true;
        }
    }

    static validateEdit = (req, res) => {
        const data = req.body;
        const validate =  ajv.compile(edituserschema);
        const valid = validate(data);

        if(!valid) {
            return res.json(validate.errors[0].message);
        } else {
            return true;
        }
    }
}

module.exports = JSONValidation;