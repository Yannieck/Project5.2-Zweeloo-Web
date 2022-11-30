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
router.post(
    "/register",
    auth,
    JSONValidator.checkRegister,
    AuthController.register
);

const multer = require("multer");
const togeojson = require('@tmcw/togeojson');
const DOMParser = require("xmldom").DOMParser;

router.post(
    "/file",
    auth,
    multer().single("gpxfileupload"),
    async (req, res) => {
        const multerText = Buffer.from(req.file.buffer).toString();
        
        const xml = new DOMParser().parseFromString(multerText);
        const json = togeojson.gpx(xml);

        res.type("application/json");
        res.send(json);
        
    }
);

module.exports = router;
