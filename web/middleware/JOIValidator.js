const schemas = require("./schemas");

class Validator {
    //If no errors occured, return true, else return the error message
    static validateLogin = (json) => {
        if (schemas.login_schema.validate(json).error == null) {
            return true;
        } else {
            return schemas.login_schema.validate(json).error.details[0].message;
        }
    };

    //If no errors occured, return true, else return the error message
    static validateRegister = (json) => {
        if (schemas.register_schema.validate(json).error == null) {
            return true;
        } else {
            return schemas.register_schema.validate(json).error.details[0]
                .message;
        }
    };

    //If no errors occured, return true, else return the error message
    static validateUser = (json) => {
        if (schemas.user_schema.validate(json).error == null) {
            return true;
        } else {
            return schemas.user_schema.validate(json).error.details[0].message;
        }
    };

    //If no errors occured, return true, else return the error message
    static validateRoute = (json) => {
        if (schemas.route_schema.validate(json).error == null) {
            return true;
        } else {
            return schemas.route_schema.validate(json).error.details[0].message;
        }
    };

    static validateGeoJson = (json) => {
        if (schemas.geojson.validate(json).error == null) {
            return true;
        } else {
            return schemas.geojson.validate(json).error.details[0].message;
        }
    };

    static validatePoi = (json) => {
        if (schemas.poi.validate(json).error == null) {
            return true;
        } else {
            return schemas.geojson.validate(json).error.details[0].message;
        }
    };

    static validateNode = (json) => {
        if (schemas.node.validate(json).error == null) {
            return true;
        } else {
            return schemas.geojson.validate(json).error.details[0].message;
        }
    };
}

module.exports = Validator;
