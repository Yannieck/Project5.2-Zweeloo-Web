const authentication = require("../config/passport");
const passport = authentication.passport;

const auth = passport.authenticate("jwt-authentication", {
    session: false,
    failureRedirect: "/login/login_required",
});

module.exports = auth;
