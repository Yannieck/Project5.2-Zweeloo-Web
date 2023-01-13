const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticator");
const AuthController = require("../../bin/db_auth_controller.js");
const JSONValidator = require("../../middleware/JSONValidator");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Check login
router.post("/login", JSONValidator.checkLogin, AuthController.login);

//Check register
router.post("/register", auth, JSONValidator.checkRegister, AuthController.register);

module.exports = router;
