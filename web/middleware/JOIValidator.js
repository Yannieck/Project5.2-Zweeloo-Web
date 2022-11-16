//JOI DOCS:
//https://joi.dev/api/?v=17.7.0

const Joi = require("joi");

const login_schema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
    }),

    password: Joi.string().min(8).max(50),
}).with("email", "password");

// const register_schema = Joi.object({
//     password: Joi.string()
//         .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
//         .min(8)
//         .max(50),
// });

class Validator {
    //If no errors occured, return true, else return the error message
    static validateLogin = (json) => {
        if (login_schema.validate(json).error == null) {
            return true;
        } else {
            return login_schema.validate(json).error.details[0].message;
        }
    };
}

module.exports = Validator;
