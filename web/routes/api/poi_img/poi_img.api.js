const express = require("express");
const router = express.Router();
const PoiImgController = require("../../../bin/db_poi_img_controller");
const HSC = require("http-status-codes");
const fs = require("fs");
const path = require("path");

/*
This gets the poi image data from the database and returns a base 64 string with the image data.
You can load this data in react native with the following syntax:

<Image
    style={styles.image}
    source={{ uri: `data:image/png;base64,${<base 64 value goes here>}`}}
    key={i}
/>

It is nessecery to specify the "data:image/png;base64," part to make sure the image reads the source properly
*/

router.get("/poi/:poi_id", async (req, res) => {
    try {
        //Get the poi images from the poi id
        const id = parseInt(req.params.poi_id);
        const poi_img = await PoiImgController.getAllImgFromPoi(id);

        //Check if there are poi images
        if (!poi_img || poi_img.length === 0) {
            //If there are no images, send a not found status and a message
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "No poi images found!" });
        } else {
            //Get all the images by the src in the database
            let images = [];
            poi_img.forEach((src) => {
                //Get the buffer of the image file, based of of the path in the database
                const buffer = fs.readFileSync(
                    path.join(__dirname, "../../../uploads/img/", src.src)
                );
                //Convert to base 64
                const b64 = Buffer.from(buffer).toString("base64");
                images.push(b64);
            });
            //Return all the base 64 image data
            return res.status(HSC.StatusCodes.OK).json(images);
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting all poi images failed: " + e });
    }
});

module.exports = router;
