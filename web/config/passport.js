const passport = require("passport");
const passportCustom = require("passport-custom");
const CustomStrategy = passportCustom.Strategy;
const jwt = require("jsonwebtoken");

// Register custom strategy
passport.use(
    "jwt-authentication",
    new CustomStrategy((req, callback) => {
        try {
            const token = req.cookies.jwt;

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

            callback(null, payload);
        } catch {
            callback(null, false);
        }
    })
);

exports.passport = passport;
