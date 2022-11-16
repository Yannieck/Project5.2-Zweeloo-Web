const UserController = require("./usercontroller");
const Authservice = require("../config/authservice");
const HCS = require("http-status-codes");
const XMLRefactor = require("../middleware/XMLRefactors");

class AuthController {
    static login = async (req, res, next) => {
        let data = req.body;

        try {
            //Get user data from the database
            const user = await UserController.getUser(data.email);
            if (!user) {
                //Return an error if the user is not in the database
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .json({
                        redirect: "/login",
                        message: "Could not find a user with this email adress",
                    });
            }

            //Check if the entered passwordt matches the user password
            if (
                await Authservice.validatePasswords(
                    data.password,
                    user.password
                )
            ) {
                //Create a "logged in" cookie
                const tokenObject = Authservice.issueJWT(user);

                //Create a cookie, send the status code and send the redirect
                return res
                    .cookie("jwt", tokenObject.token, {
                        signed: false,
                        httpOnly: true,
                        sameSite: "Strict",
                        secure: true,
                    })
                    .status(HCS.StatusCodes.OK)
                    .json({ redirect: "/routeselection" });
            } else {
                //Return an error if the password is incorrect
                return res
                    .status(HCS.StatusCodes.UNAUTHORIZED)
                    .json({ redirect: "/login", message: "invalid password" });
            }
        } catch (e) {
            //Return an error if the try failed
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .json({ redirect: "/login", message: e });
        }
    };

    static register = async (req, res) => {
        let data;
        if (req.is("application/xml")) {
            data = XMLRefactor.registerRequestParser(req.rawBody);
        } else {
            data = req.body;
        }

        try {
            const user = await UserController.getUser(data.email);
            if (user) {
                if (req.header("accept") === "application/xml") {
                    const xmlres = XMLRefactor.errorBuilder(
                        409,
                        "Email already taken",
                        "/register"
                    );
                    return res
                        .set("Content-Type", "application/xml")
                        .send(xmlres);
                } else {
                    return res.send({
                        code: 409,
                        error: "This email is already taken!",
                    });
                }
            }

            const password = data.password;
            const password_rp = data.password_repeat;

            if (!Authservice.comparePasswords(password, password_rp)) {
                if (req.header("accept") === "application/xml") {
                    const xmlres = XMLRefactor.errorBuilder(
                        403,
                        "Passwords are not equal",
                        "/register"
                    );
                    return res
                        .set("Content-Type", "application/xml")
                        .send(xmlres);
                } else {
                    return res.send({
                        code: 401,
                        message: "Passwords are not equal!",
                    });
                }
            }

            const hashed_password = Authservice.hashPassword(password);

            const new_user = await UserController.createUser(
                data.email,
                hashed_password,
                data.first_name,
                data.last_name
            );
            if (new_user) {
                if (req.header("accept") === "application/xml") {
                    const redirect = { redirect: "/login" };
                    const xmlres = XMLRefactor.responseBuilder(200, redirect);
                    return res
                        .set("Content-Type", "application/xml")
                        .status(HCS.StatusCodes.OK)
                        .send(xmlres);
                } else {
                    const redirect = { code: 200, redirect: "/login" };
                    res.status(HCS.StatusCodes.OK).json(redirect);
                }
            } else {
                if (req.header("accept") === "application/xml") {
                    const xmlres = XMLRefactor.errorBuilder(
                        400,
                        "Bad request",
                        "/register"
                    );
                    return res
                        .set("Content-Type", "application/xml")
                        .send(xmlres);
                } else {
                    return res.send({
                        code: 400,
                        message: "Bad request!",
                    });
                }
            }
        } catch (e) {
            if (req.header("accept") === "application/xml") {
                const xmlres = XMLRefactor.errorBuilder(
                    400,
                    "Bad request",
                    "/register"
                );
                return res.set("Content-Type", "application/xml").send(xmlres);
            } else {
                return res.status(HCS.StatusCodes.BAD_REQUEST).send(e);
            }
        }
    };
}

module.exports = AuthController;
