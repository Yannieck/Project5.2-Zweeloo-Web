const express = require("express");
const router = express.Router();
const PoiImgController = require("../../../bin/poiimgcontroller");
const HSC = require("http-status-codes");

router.get("/poi/:poi_id", async (req, res) => {
    try {        
        const id = parseInt(req.params.poi_id);
        const poi_img = await PoiImgController.getAllImgFromPoi(id);
        if (!poi_img || poi_img.length === 0) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "No poi images found!" });
        } else {
            return res.status(HSC.StatusCodes.OK).json(poi_img);
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting all poi images failed" });
    }
});

module.exports = router;
