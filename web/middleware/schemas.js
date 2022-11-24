const Joi = require("joi");

class ContentTypeCheck {
    //Login schema
    static login_schema = Joi.object({
        email: Joi.string()
            .email({
                minDomainSegments: 2,
            })
            .required(),

        password: Joi.string().min(8).max(50).required(),
    }).with("email", "password");

    //Register schema
    static register_schema = Joi.object({
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

    //User schema
    static user_schema = Joi.object({
        email: Joi.string()
            .email({
                minDomainSegments: 2,
            })
            .required(),

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
    });

    //Route schema
    static route_schema = Joi.object({
        name: Joi.string()
            .pattern(new RegExp("^[a-zA-Z]{1,}$"))
            .min(1)
            .max(255)
            .required(),

        route: Joi.object().required(),

        route_type: Joi.string().valid("WALK", "BIKE").required(),

        description: Joi.string()
            .pattern(new RegExp("^[a-zA-Z]{1,}$"))
            .min(1)
            .max(255)
            .required(),

        extra: Joi.string()
            .pattern(new RegExp("^[a-zA-Z]{1,}$"))
            .min(1)
            .max(255)
            .required(),

        distance: Joi.number().greater(0).required(),

        wheelchair: Joi.boolean().required(),
    });
}

module.exports = ContentTypeCheck;
