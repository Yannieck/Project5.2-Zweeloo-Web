const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

class Authservice {
    //Compare passwords
    static validatePasswords = (password, user_password) => {
        return compareSync(password, user_password);
    };

    //Create JSON Web Token
    static issueJWT = (user) => {
        const expiresIn = "2h";
        delete user.password;
        const payload = {
            user: user,
        };

        const signedToken = jwt.sign(payload, process.env.APP_SECRET, {
            expiresIn: expiresIn,
            algorithm: "HS256",
        });

        return {
            token: signedToken,
            expires: expiresIn,
        };
    };

    //Decode the JSON Web Token
    static decodeJWT = (token) => {
        const decoded = jwt.verify(token, process.env.APP_SECRET);
        return decoded.user;
    };

    static hashPassword = (password) => {
        return hashSync(password, 10);
    };

    static getSafeData = (user) => {
        delete user.password;
        return user;
    };
}

module.exports = Authservice;
