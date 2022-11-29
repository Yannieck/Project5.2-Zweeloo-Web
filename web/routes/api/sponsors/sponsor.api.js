const express = require("express");
const router = express.Router();
const SponsorController = require("../../../bin/db_sponsor_controller");
const HSC = require("http-status-codes");

router.get("/all", async (req, res) => {
    try {
        const sponsors = await SponsorController.getAllSponsors();
        if (!sponsors || sponsors.length === 0) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "No sponsors found!" });
        } else {
            return res.status(HSC.StatusCodes.OK).json(sponsors);
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting all routes failed" });
    }
});

module.exports = router;
