const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticator");
const RouteController = require("../../bin/db_route_controller.js");
const JSONValidator = require("../../middleware/JSONValidator");
const multer = require("multer");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/addroute", auth, multer().single("gpxfileupload"), JSONValidator.checkRouteCreate, JSONValidator.checkGeoJSON, RouteController.createRoute);

module.exports = router;
