const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/", (req, res) => {
    res.render("index", { logedIn: req.cookies.hasOwnProperty("jwt") });
});

router.get("/login", (req, res) => {
    res.render("login", { logedIn: req.cookies.hasOwnProperty("jwt") });
});

router.get("/login/:status", (req, res) => {
    res.render("login", {
        logedIn: Auth.checkValidJWT(req),
        status: req.params.status,
    });
});

router.get("/routeselection", auth, (req, res) => {
    res.render("route-selection", {
        logedIn: Auth.checkValidJWT(req),
    });
});

router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/login");
});

router.get("/profile", auth, (req, res) => {
    res.render("profile", {
        user: req.user.user,
        logedIn: Auth.checkValidJWT(req),
    });
});

router.get("/register", auth, (req, res) => {
    res.render("register", { logedIn: Auth.checkValidJWT(req) });
});

router.get("/register/:status", auth, (req, res) => {
    res.render("register", {
        logedIn: Auth.checkValidJWT(req),
        status: req.params.status,
    });
});

module.exports = router;
