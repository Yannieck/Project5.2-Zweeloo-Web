const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticator");
const RouteController = require("../../bin/db_route_controller.js");
const PoiController = require("../../bin/db_poi_controller.js");
const NodeController = require("../../bin/db_node_controller.js");
const JSONValidator = require("../../middleware/JSONValidator");

const multer = require("multer");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Router for adding routes
router.post("/addroute", auth, multer().single("gpxfileupload"), JSONValidator.checkRouteCreate, JSONValidator.checkGeoJSON, RouteController.createRoute);

//Routers for adding pois and nodes
router.post("/addpoi", auth, multer({dest:"uploads/"}).single('audio_src'), JSONValidator.checkPoiCreate, PoiController.createPoiWithAudio);
router.post("/addnode", auth, JSONValidator.checkNodeCreate, NodeController.createNode);

module.exports = router;
