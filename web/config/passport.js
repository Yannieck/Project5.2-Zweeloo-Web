const passport = require("passport");
const passportCustom = require("passport-custom");
const CustomStrategy = passportCustom.Strategy;
const jwt = require("jsonwebtoken");

/**
 * Get jwt token from cookie
 */
const getToken = (req) => {
    return req.cookies.jwt;
};

/**
 * Register custom strategy
 */
passport.use(
    "jwt-authentication",
    new CustomStrategy((req, done) => {
        try {
            const token = getToken(req);

            // Verify token by environment variable
            jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
                if (err) {
                    throw new Error("Token is invalid");
                }
            });

            // Get payload from token
            const payload = jwt.decode(token, {
                complete: true,
            }).payload;

            // Check if token is expired
            if (payload.exp < Date.now() / 1000) {
                throw new Error("Token expired");
            }

            done(null, payload);
        } catch {
            done(null, false);
        }
    })
);

exports.passport = passport;
