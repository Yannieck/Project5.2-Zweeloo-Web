const express = require("express");
const router = express.Router();
const UserController = require("../../../bin/db_user_controller");
const auth = require("../../../middleware/authenticator");
const AuthService = require("../../../config/authservice");
const HSC = require("http-status-codes");
const JSONValidator = require("../../../middleware/JSONValidator");

router.get("/all", auth, async (req, res) => {
    try {
        const users = await UserController.getAllUsers();
        if (!users || users.length === 0) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "No users found!" });
        } else {
            return res.status(HSC.StatusCodes.OK).json(users);
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting all routes failed" });
    }
});

router.get("/user/:id", auth, async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await UserController.getUserById(id);
        if (user) {
            const safe_user = AuthService.getSafeData(user);
            return res.status(HSC.StatusCodes.OK).json(safe_user);
        } else {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "User not found" });
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting route failed" });
    }
});

router.post(
    "/edit/:id",
    auth,
    JSONValidator.checkUserEdit,
    async (req, res) => {
        const id = parseInt(req.params.id);
        let data = req.body;

        try {
            await UserController.updateUser(
                id,
                data.email,
                data.first_name,
                data.last_name
            );
            const user = await UserController.getUserById(id);

            return res.status(HSC.StatusCodes.OK).json(user);
        } catch (e) {
            return res
                .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Updating data failed!" });
        }
    }
);

router.get("/delete/:id", auth, async (req, res) => {
    try {
        const result = await UserController.deleteUser(parseInt(req.params.id));

        if (result) {
            return res.redirect("/profiles/profile_successful_deletion");
        } else {
            return res.redirect("/profiles/profile_deletion_error");
        }
    } catch (e) {
        return res.redirect("/profiles/profiles_unknown_error");
    }
});

module.exports = router;
