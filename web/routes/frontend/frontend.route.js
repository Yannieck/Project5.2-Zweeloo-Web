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

router.get("/sponsor-editor", auth, (req, res) => {
    res.render("sponsor-editor", { logedIn: getCookie(req) });
});

router.get("/sponsor-editor/:status", auth, (req, res) => {
    res.render("sponsor-editor", {
        logedIn: getCookie(req),
        status: req.params.status,
    });
});

router.get("/route-poi-editor/:id/:selected", auth, async (req, res) => {
    const id = parseInt(req.params.id);
    const selected = parseInt(req.params.selected);

    if (!isNaN(id) && !isNaN(selected)) {
        //Get the route from the database
        const route = await RouteController.getRouteById(id);

        if (route) {
            //Check if the selected index is not the route and is within the selected array range
            if (selected > 0 && selected < route.route.features.length) {
                //Send the route json and the selected index to the page
                res.render("route-poi-editor", {
                    logedIn: getCookie(req),
                    route: route,
                    selected: selected,
                });
            } else {
                //Invalid selection
                res.redirect(`/route-poi-editor/${id}/${1}`);
            }
        } else {
            //Invalid route id
            res.redirect(`/route-info-editor/poi_invalid_id`); //SEND TO ROUTE OVERVIEW
        }
    } else {
        //Id and/or selected are not int
        res.redirect(`/`); //SEND TO ROUTE OVERVIEW
    }
});

router.get("/route-poi-editor/:id/:selected/:status", auth, async (req, res) => {
    const id = parseInt(req.params.id);
    const selected = parseInt(req.params.selected);
    console.log(id);
    console.log(selected);

    res.render("route-poi-editor", {
        logedIn: getCookie(req),
        route: null,
        selected: null,
        status: req.params.status,
        additions: `/${id}/${selected}`
    });
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
