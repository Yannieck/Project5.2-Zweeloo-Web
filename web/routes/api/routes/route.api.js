const express = require("express");
const router = express.Router();
const RouteController = require("../../../bin/db_route_controller");
const HSC = require("http-status-codes");
const auth = require("../../../middleware/authenticator");
const JSONValidator = require("../../../middleware/JSONValidator");

/**
 * Removes the markers from a GeoJSON object
 * @param {GeoJSON} geojson
 * @returns a geojson object without markers
 */
const removeGeoJsonMarkers = (geojson) => {
    if (Array.isArray(geojson)) {
        geojson.forEach((obj) => {
            obj.route.features.length = 1;
        });
    } else {
        geojson.route.features.length = 1;
    }
    return geojson;
};

/**
 * API endpoint for getting singular route by id, from the database
 */
router.get("/route/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const route = await RouteController.getRouteById(id);
        if (!route) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "A route with this id does not exist" });
        }
        return res.status(HSC.StatusCodes.OK).json(removeGeoJsonMarkers(route));
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting route failed" });
    }
});

/**
 * API endpoint for getting all routes from the database
 */
router.get("/all", async (req, res) => {
    try {
        const routes = await RouteController.getAllRoutes();
        if (!routes || routes.length === 0) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "Routes not found" });
        } else {
            return res
                .status(HSC.StatusCodes.OK)
                .json(removeGeoJsonMarkers(routes));
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting all routes failed" });
    }
});

/**
 * API endpoint for getting all bike routes from the database
 */
router.get("/bikeroutes", async (req, res) => {
    try {
        const routes = await RouteController.getBikeRoutes();
        if (!routes || routes.length === 0) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "Routes not found" });
        } else {
            return res
                .status(HSC.StatusCodes.OK)
                .json(removeGeoJsonMarkers(routes));
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting bike routes failed" });
    }
});

/**
 * API endpoint for getting all walking routes from the database
 */
router.get("/walkroutes", async (req, res) => {
    try {
        const routes = await RouteController.getWalkRoutes();
        if (!routes || routes.length === 0) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "Routes not found" });
        } else {
            return res
                .status(HSC.StatusCodes.OK)
                .json(removeGeoJsonMarkers(routes));
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting walk routes failed" });
    }
});

module.exports = router;
