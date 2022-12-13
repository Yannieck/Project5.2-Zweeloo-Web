const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticator");
const RouteController = require("../../bin/db_route_controller");

const getCookie = (req) => {
    if (!req.cookies) return false;

    if (Object.keys(req.cookies).length > 0) {
        return req.cookies.hasOwnProperty("jwt");
    } else {
        return false;
    }
};

router.get("/", (req, res) => {
    res.render("index", { logedIn: getCookie(req) });
});

router.get("/login", (req, res) => {
    res.render("login", { logedIn: getCookie(req) });
});

router.get("/login/:status", (req, res) => {
    res.render("login", {
        logedIn: getCookie(req),
        status: req.params.status,
    });
});

router.get("/routeselection", auth, (req, res) => {
    res.render("route-selection", {
        logedIn: getCookie(req),
    });
});

router.get("/route-info-editor", auth, (req, res) => {
    res.render("route-info-editor", { logedIn: getCookie(req) });
});

router.get("/route-poi-editor/:id/:feature", auth, async (req, res) => {
    const id = parseInt(req.params.id);
    const feature = parseInt(req.params.feature);
    if (id) {
        //Get the route from the database
        const route = await RouteController.getRouteById(id);

        //Check if the feature index is not the route and is within the feature array range
        if (feature > 0 && feature < route.route.features.length) {
            //Send the route json and the feature index to the page
            res.render("route-poi-editor", {
                logedIn: getCookie(req),
                route: route,
                selected: feature,
            });
        } else {
            res.redirect("/route-info-editor/route_unknown_error");
        }
    } else {
        res.redirect("/route-info-editor/route_unknown_error");
    }
});

router.get("/route-poi-editor/:id/:feature/:status", auth, async (req, res) => {
    const id = parseInt(req.params.id);
    const feature = parseInt(req.params.feature);
    if (id) {
        //Get the route from the database
        const route = await RouteController.getRouteById(id);

        //Check if the feature index is not the route and is within the feature array range
        if (feature > 0 && feature < route.route.features.length) {
            //Send the route json and the feature index to the page
            res.render("route-poi-editor", {
                logedIn: getCookie(req),
                route: route,
                selected: feature,
                status: req.params.status,
            });
        } else {
            res.redirect("/route-info-editor/route_unknown_error");
        }
    } else {
        res.redirect("/route-info-editor/route_unknown_error");
    }
});

router.get("/route-info-editor/:status", auth, (req, res) => {
    res.render("route-info-editor", {
        logedIn: getCookie(req),
        status: req.params.status,
    });
});

router.get("/route-editor", auth, (req, res) => {
    res.render("route-editor", {
        logedIn: getCookie(req),
    });
});

router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/login");
});

router.get("/profile", auth, (req, res) => {
    res.render("profile", {
        user: req.user.user,
        logedIn: getCookie(req),
    });
});

router.get("/register", auth, (req, res) => {
    res.render("register", { logedIn: getCookie(req) });
});

router.get("/register/:status", auth, (req, res) => {
    res.render("register", {
        logedIn: getCookie(req),
        status: req.params.status,
    });
});

module.exports = router;
