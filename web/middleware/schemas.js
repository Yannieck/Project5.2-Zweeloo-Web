//For JOI references, see: https://joi.dev/api/?v=17.7.0
const Joi = require("joi");

const URL_regex = new RegExp(
    "^" +
    // protocol identifier (optional)
    // short syntax // still required
    "(?:(?:(?:https?|ftp):)?\\/\\/)" +
    // user:pass BasicAuth (optional)
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    // IP address exclusion
    // private & local networks
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broadcast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    // host & domain names, may end with dot
    // can be replaced by a shortest alternative
    // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
    "(?:" +
    "(?:" +
    "[a-z0-9\\u00a1-\\uffff]" +
    "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
    ")?" +
    "[a-z0-9\\u00a1-\\uffff]\\." +
    ")+" +
    // TLD identifier name, may end with dot
    "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")" +
    // port number (optional)
    "(?::\\d{2,5})?" +
    // resource path (optional)
    "(?:[/?#]\\S*)?" +
    "$", "i");

class JOISchemas {
    //Sponsor schema
    static sponsor_schema = Joi.object({
        sponsor_name: Joi.string()
            .pattern(new RegExp("^[ a-zA-ZÀ-ž-]{1,}$"))
            .min(1)
            .max(255)
            .required(),
        sponsor_address: Joi.string()
            .pattern(new RegExp("^[ a-zA-ZÀ-ž0-9]{1,}$"))
            .min(1)
            .max(255)
            .required(),
        link: Joi.string()
            .pattern(new RegExp(URL_regex))
            .min(1)
            .max(255)
            .required()

    }).with("sponsor_name", "sponsor_address").with("sponsor_name", "link");

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
            .pattern(
                new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$"
                )
            )
            .min(8)
            .max(50)
            .required(),

        password_repeat: Joi.string()
            .pattern(
                new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$"
                )
            )
            .min(8)
            .max(50)
            .required()
            .valid(Joi.ref("password")),

        first_name: Joi.string()
            .pattern(new RegExp("^[ a-zA-ZÀ-ž-]{1,}$"))
            .min(1)
            .max(255)
            .required(),

        last_name: Joi.string()
            .pattern(new RegExp("^[ a-zA-ZÀ-ž-]{1,}$"))
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
            .pattern(new RegExp("^[ a-zA-ZÀ-ž-]{1,}$"))
            .min(1)
            .max(255)
            .required(),

        last_name: Joi.string()
            .pattern(new RegExp("^[ a-zA-ZÀ-ž-]{1,}$"))
            .min(1)
            .max(255)
            .required(),
    });

    //Route schema
    static route_schema = Joi.object({
        name: Joi.string()
            .pattern(new RegExp("^[ A-Za-zÀ-ž0-9\"\'/]{1,}$"))
            .min(1)
            .max(255)
            .required(),

        routetype: Joi.string().valid("walk", "bike").required(),

        description: Joi.string()
            .pattern(new RegExp("^[A-Za-zÀ-ž0-9_@.,\/#&+-=?!€%*():;~\"\'\\s]{1,}$"))
            .min(1)
            .max(2048)
            .required(),

        extra: Joi.string()
            .pattern(new RegExp("^[ A-Za-zÀ-ž0-9\"\'/]{1,}$"))
            .min(1)
            .max(255)
            .allow(""),

        wheelchair: Joi.string().valid("yes", "no").required(),
    });

    //GeoJson schema
    static geojson = Joi.object({
        type: Joi.string().valid("FeatureCollection").required(),

        features: Joi.array()
            .has(
                //LineString
                Joi.object({
                    type: Joi.string().valid("Feature").required(),
                    properties: Joi.object({
                        _gpxType: Joi.string().required(),
                        name: Joi.string().required(),
                        type: Joi.string()
                            .valid("Cycling", "Running")
                            .required(),
                        coordinateProperties: Joi.object().required(),
                    }).required(),
                    geometry: Joi.object({
                        type: Joi.string().valid("LineString").required(),
                        coordinates: Joi.array()
                            .min(2)
                            .items(
                                Joi.array()
                                    .length(3)
                                    .items(
                                        Joi.number().min(0).max(360).required(),
                                        Joi.number().min(0).max(360).required(),
                                        Joi.number().required()
                                    )
                                    .required()
                            )
                            .required(),
                    }).required(),
                }).required()
            )
            .has(
                //Markers
                Joi.object({
                    type: Joi.string().valid("Feature").required(),
                    properties: Joi.object({
                        name: Joi.string().required(),
                        desc: Joi.string(),
                        sym: Joi.string().required(),
                    }),
                    geometry: Joi.object({
                        type: Joi.string().valid("Point").required(),
                        coordinates: Joi.array().items(
                            Joi.number().min(0).max(360).required(),
                            Joi.number().min(0).max(360).required(),
                            Joi.number().required()
                        ),
                    }),
                }).required()
            )
            .required(),
    });

    //Poi schema
    static poi = Joi.object({
        selected: Joi.number().min(0).required(),
        lat: Joi.number().min(0).max(360).required(),
        lon: Joi.number().min(0).max(360).required(),
        routeid: Joi.number().integer().min(0).required(),
        type: Joi.string().valid("POI", "INFO", "INVIS", "CAFE").required(),
        name: Joi.string()
            .pattern(new RegExp("^[ A-Za-zÀ-ž0-9\"\'/]{1,}$"))
            .required(),
        desc: Joi.string()
            .pattern(new RegExp("^[A-Za-zÀ-ž0-9_@.,\/#&+-=?!€%*():;~\"\'\\s]{1,}$"))
            .required(),
        autoplay: Joi.string().valid("on"),
        radius: Joi.number().min(0).required(),
    });

    //Node schema
    static node = Joi.object({
        selected: Joi.number().min(0).required(),
        lat: Joi.number().min(0).max(360).required(),
        lon: Joi.number().min(0).max(360).required(),
        routeid: Joi.number().integer().min(0).required(),
        nodenr: Joi.number().integer().min(0).required(),
    });
}

module.exports = JOISchemas;
