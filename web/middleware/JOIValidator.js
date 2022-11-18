//JOI DOCS:
//https://joi.dev/api/?v=17.7.0

const Joi = require("joi");

const login_schema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .required(),

    password: Joi.string().min(8).max(50).required(),
}).with("email", "password");

const register_schema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .required(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9#?!@$%^&*-]{8,}$"))
        .min(8)
        .max(50)
        .required(),

    password_repeat: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9#?!@$%^&*-]{8,}$"))
        .min(8)
        .max(50)
        .required()
        .valid(Joi.ref("password")),

    first_name: Joi.string()
        .pattern(new RegExp("^[a-zA-Z]{1,}$"))
        .min(1)
        .max(255)
        .required(),

    last_name: Joi.string()
        .pattern(new RegExp("^[a-zA-Z]{1,}$"))
        .min(1)
        .max(255)
        .required(),
})
    .with("password", "password_repeat")
    .with("first_name", "last_name");

class Validator {
    //If no errors occured, return true, else return the error message
    static validateLogin = (json) => {
        if (login_schema.validate(json).error == null) {
            return true;
        } else {
            return login_schema.validate(json).error.details[0].message;
        }
    };

    //If no errors occured, return true, else return the error message
    static validateRegister = (json) => {
        if (register_schema.validate(json).error == null) {
            return true;
        } else {
            return register_schema.validate(json).error.details[0].message;
        }
    };
}

module.exports = Validator;
