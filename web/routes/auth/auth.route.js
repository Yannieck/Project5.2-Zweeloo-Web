const express = require("express");
const router = express.Router();
const Auth = require("../../middleware/auth");
const AuthController = require("../../bin/authcontroller");
const ContentTypeCheck = require("../../middleware/contenttypecheck");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Check login
router.post("/login", ContentTypeCheck.checkLogin, AuthController.login);

//Check register
router.post("/register", Auth.authenticate, ContentTypeCheck.checkRegister, AuthController.register);

module.exports = router;
