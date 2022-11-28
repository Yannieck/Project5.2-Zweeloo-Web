const express = require("express");
const router = express.Router();
const UserController = require("../../../bin/usercontroller");
const Auth = require("../../../middleware/auth");
const authservice = require("../../../config/authservice");
const HSC = require("http-status-codes");
const ContentTypeCheck = require("../../../middleware/contenttypecheck");

router.get("/allUsers", Auth.authenticate, async (req, res) => {
    try {
        const users = await UserController.getAllUsers();
        if (!users || users.length === 0) {
            return res.json({ message: "No users found!" });
        } else {
            return res.status(HSC.StatusCodes.OK).json(users);
        }
    } catch (e) {
        return res.status(HSC.StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
});

router.get("/:id", Auth.authenticate, async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await UserController.getUserById(id);
        if (user) {
            const safe_user = authservice.getSafeData(user);
            return res.status(HSC.StatusCodes.OK).json(safe_user);
        } else {
            return res.send({ message: "User not found" });
        }
    } catch (e) {
        return res.status(HSC.StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
});

router.post(
    "/edit/:id",
    Auth.authenticate,
    ContentTypeCheck.checkUserEdit,
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

            return res.status(HSC.StatusCodes.OK).send(user);
        } catch (e) {
            return res.status(500).send({ err: "Updating data failed!" });
        }
    }
);

router.delete("/deleteuser/:id", Auth.authenticate, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await UserController.deleteUser(id);

        if (result) {
            return res
                .status(HSC.StatusCodes.OK)
                .send({ message: "User deleted succesfully!" });
        } else {
            return res.send({
                code: 400,
                message: "Bad request!",
            });
        }
    } catch (e) {
        return res.status(HSC.StatusCodes.BAD_REQUEST).send(e);
    }
});

module.exports = router;
