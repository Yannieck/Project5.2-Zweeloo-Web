const express = require("express");
const router = express.Router();
const RouteController = require("../../../bin/db_route_controller");
const HSC = require("http-status-codes");
const auth = require("../../../middleware/authenticator");
const JSONValidator = require("../../../middleware/JSONValidator");

router.get("/route/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const route = await RouteController.getRouteById(id);
        if (!route) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "A route with this id does not exist" });
        }

        return res.status(HSC.StatusCodes.OK).json(route);
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting route failed" });
    }
});

router.get("/all", async (req, res) => {
    try {
        const routes = await RouteController.getAllRoutes();
        if (!routes || routes.length === 0) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "Routes not found" });
        } else {
            return res.status(HSC.StatusCodes.OK).json(routes);
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Getting all routes failed" });
    }
});

router.post(
    "/createroute",
    auth,
    JSONValidator.checkRouteCreate,
    async (req, res) => {
        let data = req.body;

        try {
            const route = await RouteController.getRoute(data);
            if (route) {
                return res
                    .status(HSC.StatusCodes.CONFLICT)
                    .json({ message: "Route already exists" });
            }
            const new_route = await RouteController.createRoute(
                data.name,
                data.route_type,
                data.route,
                data.user_id
            );
            if (new_route) {
                const created_route = await RouteController.getRouteById(
                    data.id
                );
                return res.status(HSC.StatusCodes.OK).json(created_route);
            } else {
                return res
                    .status(HSC.StatusCodes.BAD_REQUEST)
                    .json({ message: "Bad request" });
            }
        } catch (e) {
            return res
                .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Could not create route" });
        }
    }
);

router.delete("/deleteroute/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await RouteController.deleteRoute(id);

        if (result) {
            return res
                .status(HSC.StatusCodes.OK)
                .json({ message: "User deleted succesfully" });
        } else {
            return res
                .status(HSC.StatusCodes.BAD_REQUEST)
                .send({ message: "Bad request" });
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Could not delete route" });
    }
});

module.exports = router;
