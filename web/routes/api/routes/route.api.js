const express = require("express");
const router = express.Router();
const RouteController = require("../../../bin/routecontroller");
const HSC = require("http-status-codes");
const auth = require("../../../middleware/auth");
const ContentTypeCheck = require("../../../middleware/contenttypecheck");

router.get("/route/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const route = await RouteController.getRouteById(id);
        if (!route) {
            return res
                .status(HSC.StatusCodes.NOT_FOUND)
                .json({ message: "A route with this id does not exist!" });
        }

        return res.status(HSC.StatusCodes.OK).send(route);
    } catch (e) {
        return res.status(HSC.StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
});

router.get("/allroutes", async (req, res) => {
    try {
        const routes = await RouteController.getAllRoutes();
        if (!routes || routes.length === 0) {
            return res.send({ message: "Routes not found!" });
        } else {
            return res.status(HSC.StatusCodes.OK).json(routes);
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ err: "Getting all routes failed" });
    }
});

router.get("/allroutesnames", async (req, res) => {
    try {
        const routes = await RouteController.getAllRoutesNames();
        if (!routes || routes.length === 0) {
            return res.send({ message: "Routes not found!" });
        } else {
            return res.status(HSC.StatusCodes.OK).json(routes);
        }
    } catch (e) {
        return res
            .status(HSC.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ err: "Getting all routes with names failed" });
    }
});

router.post(
    "/createroute",
    auth,
    ContentTypeCheck.checkRouteCreate,
    async (req, res) => {
        let data = req.body;

        try {
            const route = await RouteController.getRoute(data);
            if (route) {
                return res.send({
                    code: 409,
                    error: "Route already exists!",
                });
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
                return res.send({
                    code: 400,
                    message: "Bad request!",
                });
            }
        } catch (e) {
            return res.status(HSC.StatusCodes.BAD_REQUEST).send(e);
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
                .send({ message: "User deleted succesfully!" });
        } else {
            return res.send({
                code: 400,
                message: "Bad request!",
            });
        }
    } catch (e) {
        return res.status(HSC.StatusCodes.BAD_REQUEST).send(e);
    }
});

module.exports = router;
