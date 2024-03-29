const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticator");
const RouteController = require("../../bin/db_route_controller");
const SponsorController = require("../../bin/db_sponsor_controller");
const UserController = require("../../bin/db_user_controller");
const fs = require("fs");
const path = require("path");
const Authservice = require("../../config/authservice");
const HSC = require("http-status-codes");

//Check if there is a valid cookie present.
//This makes the correct buttons appear in the nav bar
const getCookie = (req, res) => {
    if (!req.cookies) return false;

    if (Object.keys(req.cookies).length <= 0) {
        return false;
    }

    if (!req.cookies.hasOwnProperty("jwt")) {
        return false;
    } else {
        const valid = Authservice.validateJWT(req.cookies.jwt);

        if (!valid) {
            res.clearCookie("jwt").status(498).redirect("/invalid_token");
        }
        return valid;
    }
};

router.get("/", (req, res) => {
    res.render("index", { loggedIn: getCookie(req, res) });
});

router.get("/invalid_token", (req, res) => {
    res.render("index", {
        loggedIn: getCookie(req, res),
        status: "invalid_token",
    });
});

//Log in/out
router.get("/login", (req, res) => {
    res.render("login", { loggedIn: getCookie(req, res) });
});

router.get("/login/:status", (req, res) => {
    res.render("login", {
        loggedIn: getCookie(req, res),
        status: req.params.status,
    });
});

router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/login");
});

//Route overview page
router.get("/route-selection", auth, async (req, res) => {
    const routes = await RouteController.getAllRoutes();

    if (routes) {
        res.render("route-selection", {
            loggedIn: getCookie(req, res),
            routes: routes,
        });
    } else {
        res.redirect(`/route-selection/error_routes`);
    }
});

router.get("/route-selection/:status", auth, async (req, res) => {
    res.render("route-selection", {
        loggedIn: getCookie(req, res),
        routes: [],
        status: req.params.status,
    });
});

router.get("/route-selection/:status/:id", auth, async (req, res) => {
    const id = parseInt(req.params.id);
    res.render("route-selection", {
        loggedIn: getCookie(req, res),
        routes: [],
        status: req.params.status,
        additions: id, //Id is used for redirecting to route editor
    });
});

//Route editor (editor page 1)
router.get("/route-editor", auth, (req, res) => {
    res.render("route-editor", {
        loggedIn: getCookie(req, res),
    });
});

//Route info editor (editor page 2)
router.get("/route-info-editor", auth, (req, res) => {
    res.render("route-info-editor", { loggedIn: getCookie(req, res) });
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
                    loggedIn: getCookie(req, res),
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

router.get("/route-info-editor/:status", auth, (req, res) => {
    res.render("route-info-editor", {
        loggedIn: getCookie(req, res),
        status: req.params.status,
    });
});

//Route poi editor (editor page 3)
router.get(
    "/route-poi-editor/:id/:selected/:status",
    auth,
    async (req, res) => {
        const id = parseInt(req.params.id);
        const selected = parseInt(req.params.selected);

        res.render("route-poi-editor", {
            loggedIn: getCookie(req, res),
            route: null,
            selected: null,
            status: req.params.status,
            additions: `/${id}/${selected}`,
        });
    }
);

//Sponsor overview page
router.get("/sponsors", auth, async (req, res) => {
    //Get all sponsors from the database
    let sponsors = await SponsorController.getAllSponsors();

    try {
        //Get the images for the sponsor
        sponsors.forEach((sponsor) => {
            //Read the image file data
            const buffer = fs.readFileSync(
                path.join(__dirname, "../../uploads/img/", sponsor.logo)
            );
            //Convert the data to base 64
            sponsor.logo = Buffer.from(buffer).toString("base64");
        });

        //Load the sponsor page with the sponsor data parsed
        res.render("sponsors", {
            loggedIn: getCookie(req, res),
            sponsors: sponsors,
        });
    } catch (error) {
        res.redirect("sponsors/invalid_img");
    }
});

// Sponsor page but with a particular status for a Swal
router.get("/sponsors/:status", auth, (req, res) => {
    res.render("sponsors", {
        loggedIn: getCookie(req, res),
        sponsors: [],
        status: req.params.status,
    });
});

router.get("/sponsors/:status/:id", auth, (req, res) => {
    res.render("sponsors", {
        loggedIn: getCookie(req, res),
        sponsors: [],
        status: req.params.status,
        additions: req.params.id, //Id is used for deletion
    });
});

//Sponsor editor
router.get("/sponsor-editor", auth, (req, res) => {
    res.render("sponsor-editor", { loggedIn: getCookie(req, res) });
});

//Sponsor editor page but with a particular status for a Swal
router.get("/sponsor-editor/:status", auth, (req, res) => {
    res.render("sponsor-editor", {
        loggedIn: getCookie(req, res),
        status: req.params.status,
    });
});

//Users own profile page
router.get("/profile", auth, (req, res) => {
    res.render("profile", {
        user: req.user.user,
        loggedIn: getCookie(req, res),
    });
});

router.get("/profile/:status", auth, (req, res) => {
    res.render("profile", {
        user: req.user.user,
        loggedIn: getCookie(req, res),
        status: req.params.status,
    });
});

//Profile overview page
router.get("/profiles", auth, async (req, res) => {
    res.render("profile-overview", {
        profiles: await UserController.getAllUsers(),
        loggedIn: getCookie(req, res),
    });
});

router.get("/profiles/:status", auth, (req, res) => {
    res.render("profile-overview", {
        user: req.user.user,
        profiles: [],
        loggedIn: getCookie(req, res),
        status: req.params.status,
    });
});

router.get("/profiles/:status/:id", auth, async (req, res) => {
    res.render("profile-overview", {
        profiles: await UserController.getAllUsers(),
        loggedIn: getCookie(req, res),
        status: req.params.status,
        additions: req.params.id, //Id is used for deletion
    });
});

//Create account page
router.get("/register", auth, (req, res) => {
    res.render("register", { loggedIn: getCookie(req, res) });
});

router.get("/register/:status", auth, (req, res) => {
    res.render("register", {
        loggedIn: getCookie(req, res),
        status: req.params.status,
    });
});

module.exports = router;
