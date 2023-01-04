const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticator");
const DBObjectCreator = require("../../middleware/db_object_creator.js");
const JSONValidator = require("../../middleware/JSONValidator");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
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
router.post("/addroute", auth, multer().single("gpxfileupload"), JSONValidator.checkRouteCreate, JSONValidator.checkGeoJSON, DBObjectCreator.createRoute);

//Routers for adding pois
const uploadAudioAndImg = multer({storage: storage}).fields([{name: 'audio_src', maxCount: 1},{name: 'img_src'}]);
router.post("/addpoi", auth, uploadAudioAndImg, JSONValidator.checkPoiCreate, DBObjectCreator.createPoi);

//Router for adding nodes
router.post("/addnode", auth, JSONValidator.checkNodeCreate, DBObjectCreator.createNode);

//Router for adding sponsors
router.post("/addsponsor", auth, multer({storage: storage}).single('imgsrc'), JSONValidator.checkSponsor, DBObjectCreator.createSponsor);

module.exports = router;
