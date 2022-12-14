const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticator");
const RouteController = require("../../bin/db_route_controller.js");
const PoiController = require("../../bin/db_poi_controller.js");
const NodeController = require("../../bin/db_node_controller.js");
const JSONValidator = require("../../middleware/JSONValidator");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file.mimetype);
        if (file.mimetype.startsWith("audio/")) {
            cb(null, "./uploads/audio/");
        } else if (file.mimetype.startsWith("image/")) {
            cb(null, "./uploads/img/");
        } else {
            cb(new Error("Invalid file type"));
        }
    },
});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Router for adding routes
router.post("/addroute", auth, multer().single("gpxfileupload"), JSONValidator.checkRouteCreate, JSONValidator.checkGeoJSON, RouteController.createRoute);

//Routers for adding pois
const uploadAudioAndImg = multer({storage: storage}).fields([{name: 'audio_src', maxCount: 1},{name: 'img_src'}]);
router.post("/addpoi", auth, uploadAudioAndImg, JSONValidator.checkPoiCreate, PoiController.createPoiWithAudio);

//Router for adding nodes
router.post("/addnode", auth, JSONValidator.checkNodeCreate, NodeController.createNode);



module.exports = router;
