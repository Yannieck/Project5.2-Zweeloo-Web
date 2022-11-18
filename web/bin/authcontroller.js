const UserController = require("./usercontroller");
const AuthService = require("../config/AuthService");
const HCS = require("http-status-codes");

class AuthController {
    static login = async (req, res, next) => {
        let data = req.body;

        try {
            //Get user data from the database
            const user = await UserController.getUser(data.email);
            if (!user) {
                //Return an error if the user is not in the database
                return res.status(HCS.StatusCodes.BAD_REQUEST).json({
                    redirect: "/login",
                    message: "Could not find a user with this email adress",
                });
            }

            //Check if the entered passwordt matches the user password
            if (
                await AuthService.validatePasswords(
                    data.password,
                    user.password
                )
            ) {
                //Create a "logged in" cookie
                const tokenObject = AuthService.issueJWT(user);

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
        let data = req.body;

        try {
            const user = await UserController.getUser(data.email);
            if (user) {
                return res.status(HCS.StatusCodes.CONFLICT).json({
                    redirect: "/register",
                    message: "This email is already taken",
                });
            }

            if (
                !AuthService.comparePasswords(
                    data.password,
                    data.password_repeat
                )
            ) {
                return res.status(HCS.StatusCodes.UNAUTHORIZED).json({
                    redirect: "/register",
                    message: "Passwords are not equal",
                });
            }

            const hashed_password = AuthService.hashPassword(data.password);

            const new_user = await UserController.createUser(
                data.email,
                hashed_password,
                data.first_name,
                data.last_name
            );

            if (new_user) {
                res.status(HCS.StatusCodes.OK).json({ redirect: "/login" });
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .json({
                        redirect: "/register",
                        message: "Could not create account",
                    });
            }
        } catch (e) {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .json({ redirect: "/register", message: e });
        }
    };
}

module.exports = AuthController;
