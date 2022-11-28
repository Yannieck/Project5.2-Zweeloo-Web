const authentication = require("../config/passport");
const passport = authentication.passport;
const jwt = require("jsonwebtoken");

class Auth {
    static authenticate = passport.authenticate("jwt-authentication", {
        session: false,
        failureRedirect: '/login'
    });

    static checkValidJWT = (req) => {
        // Check if cookies exist
        if (!req.cookies) {
            return false;
        }
    
        //Check if JWT cookie exists
        if (!req.cookies.hasOwnProperty("jwt")) {
            return false;
        }
    
        //Get token from JWT
        const token = req.cookies.jwt;
    
        //Verify token
        const errors = jwt.verify(token, process.env.APP_SECRET, (err) => {
            return err;
        });
    
        return errors == null;
    };
}

module.exports = Auth;