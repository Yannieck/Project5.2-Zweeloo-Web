const express = require("express");
const router = express.Router();
const SponsorController = require("../../../bin/db_sponsor_controller");
const HSC = require("http-status-codes");
const fs = require("fs");
const path = require("path");
const auth = require("../../../middleware/authenticator");

/**
 * Get all sponsors from the database
 */
router.get("/all", async (req, res) => {
    try {
        let sponsors = await SponsorController.getAllSponsors();

        if (!sponsors || sponsors.length === 0) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "No sponsors found!" });
        } else {
            sponsors.forEach((sponsor) => {
                const buffer = fs.readFileSync(
                    path.join(__dirname, "../../../uploads/img/", sponsor.logo)
                );
                //Convert the data to base 64
                sponsor.logo = Buffer.from(buffer).toString("base64");
            });

            return res.status(HSC.StatusCodes.OK).json(sponsors);
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting all routes failed" });
    }
});

router.get("/delete/:id", auth, async (req, res) => {
    let sponsors = await SponsorController.deleteSponsor(parseInt(req.params.id));
    if (sponsors) {
        return res.redirect("/sponsors/successful_deletion");
    }
    return res.redirect("/sponsors/deletion_error");
});

module.exports = router;
