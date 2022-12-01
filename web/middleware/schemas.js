const Joi = require("joi");

class JOISchemas {
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
            .pattern(new RegExp("^[a-zA-Z0-9 ]{1,}$"))
            .min(1)
            .max(255)
            .required(),

        routetype: Joi.string().valid("walk", "bike").required(),

        description: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9 ]{1,}$"))
            .min(1)
            .max(255)
            .required(),

        extra: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9 ]{1,}$"))
            .min(1)
            .max(255)
            .allow(""),

        wheelchair: Joi.string().valid("yes", "no").required(),
    });

    static geojson = Joi.object({
        type: Joi.string().valid("FeatureCollection").required(),

        features: Joi.array()
            .items(
                Joi.object({
                    type: Joi.string().valid("Feature"),
                    properties: Joi.object({
                        _gpxType: Joi.string(),
                        name: Joi.string()
                            .pattern(new RegExp("^[a-zA-Z0-9 ]{1,}$"))
                            .required(),
                        type: Joi.string().valid("Cycling", "Running"),
                        coordinateProperties: Joi.object(),
                        desc: Joi.string().pattern(
                            new RegExp("^[a-zA-Z0-9 ]{1,}$")
                        ),
                        sym: Joi.string(),
                    }),
                    geometry: Joi.object({
                        type: Joi.string().valid("LineString", "Point"),
                        coordinates: Joi.alternatives(
                            Joi.array().items(
                                Joi.array().items(
                                    Joi.number().min(0).max(360),
                                    Joi.number().min(0).max(360),
                                    Joi.number()
                                )
                            ),
                            Joi.array().items(
                                Joi.number().min(0).max(360),
                                Joi.number().min(0).max(360)
                            )
                        ),
                    }),
                }).required()
            )
            .required(),
    });
}

module.exports = JOISchemas;
