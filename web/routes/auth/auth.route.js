const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const AuthController = require("../../bin/authcontroller");
const ContentTypeCheck = require("../../middleware/contenttypecheck");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Check login
router.post("/login", ContentTypeCheck.checkLogin, AuthController.login);

//Check register
router.post(
    "/register",
    auth,
    ContentTypeCheck.checkRegister,
    AuthController.register
);

module.exports = router;
