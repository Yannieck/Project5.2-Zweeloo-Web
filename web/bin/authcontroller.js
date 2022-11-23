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
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/login/invalid_credentials`);
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
                    .redirect(`/login/login_successfull`);
            } else {
                //Return an error if the password is incorrect
                return res
                    .status(HCS.StatusCodes.UNAUTHORIZED)
                    .redirect(`/login/invalid_credentials`);
            }
        } catch (e) {
            //Return an error if the try failed
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/login/login_unknown_error`);
        }
    };

    static register = async (req, res) => {
        let data = req.body;

        try {
            //Try to find the email in the database to check if the email is taken
            const user = await UserController.getUser(data.email);
            if (user) {
                return res
                    .status(HCS.StatusCodes.CONFLICT)
                    .redirect(`/register/email_taken`);
            }

            //Make sure the passwords are identical
            if (!data.password === data.password_repeat) {
                return res
                    .status(HCS.StatusCodes.UNAUTHORIZED)
                    .redirect(`/register/unequal_password`);
            }

            //Create a user
            const hashed_password = AuthService.hashPassword(data.password);

            const new_user = await UserController.createUser(
                data.email,
                hashed_password,
                data.first_name,
                data.last_name
            );

            //Redirect when done
            if (new_user) {
                res.status(HCS.StatusCodes.OK).redirect(
                    `/register/register_success`
                );
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/register/failed_create_account`);
            }
        } catch (e) {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/register/register_unknown_error`);
        }
    };
}

module.exports = AuthController;
