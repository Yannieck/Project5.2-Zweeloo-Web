const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticator");
const FileLoader = require("../../middleware/fileupload.js");
const JSONValidator = require("../../middleware/JSONValidator");
const multer = require("multer");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.post("/addroute", auth, multer().single("gpxfileupload"), FileLoader.convertXMLtoJSON);
router.post("/addroute", auth, multer().single("gpxfileupload"), JSONValidator.checkRouteCreate, FileLoader.validateForm);


module.exports = router;
