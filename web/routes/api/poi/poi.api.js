const express = require("express");
const router = express.Router();
const PoiController = require("../../../bin/db_poi_controller");
const HSC = require("http-status-codes");
const fs = require("fs");
const path = require("path");

/**
 * API endpoint for getting images from poi
 */
router.get("/:poi_id", async (req, res) => {
    try {
        //Get the poi from the id
        const id = parseInt(req.params.poi_id);
        let poi = await PoiController.getPoi(id);

        //Check if there are poi
        if (!poi) {
            //If there are no images, send a not found status and a message
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "No poi found" });
        } else {
            if (poi.audio_src) {
                //Get the buffer from the audio file
                const buffer = fs.readFileSync(
                    path.join(
                        __dirname,
                        "../../../uploads/audio/",
                        poi.audio_src
                    )
                );
                //Convert to base 64 and set the audiosrc to the base 64 value
                poi.audio_src = Buffer.from(buffer).toString("base64");
            }
            
            //Loop through the poi images in the poi
            poi.poi_img.forEach((img) => {
                //Get the buffer for each image file, based of of the path in the database
                const buffer = fs.readFileSync(
                    path.join(__dirname, "../../../uploads/img/", img.src)
                );
                //Convert the data to base 64
                const b64 = Buffer.from(buffer).toString("base64");

                //Set the src of the poi img to the base 64 value
                img.src = b64;
            });

            return res.status(HSC.StatusCodes.OK).json(poi);
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting all pois failed" });
    }
});

module.exports = router;
