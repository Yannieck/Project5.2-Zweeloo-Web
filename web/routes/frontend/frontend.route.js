const express = require("express");
const router = express.Router();
const Auth = require("../../middleware/auth");

router.get("/", (req, res) => {
    res.render("index", { logedIn: false });
});

router.get("/", Auth.authenticate, (req, res) => {
    res.render("index", { logedIn: true });
});

router.get("/login", (req, res) => {
    res.render("login", { logedIn: Auth.checkValidJWT("/login") });
});

router.get("/login/:status", (req, res) => {
    res.render("login", {
        logedIn: Auth.checkValidJWT(req),
        status: req.params.status,
    });
});

router.get("/routeselection", Auth.authenticate, (req, res) => {
    res.render("route-selection", {
        logedIn: Auth.checkValidJWT(req),
    });
});

router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/login");
});

router.get("/profile", Auth.authenticate, (req, res) => {
    res.render("profile", {
        user: req.user.user,
        logedIn: Auth.checkValidJWT(req),
    });
});

router.get("/register", Auth.authenticate, (req, res) => {
    res.render("register", { logedIn: Auth.checkValidJWT(req) });
});

router.get("/register/:status", Auth.authenticate, (req, res) => {
    res.render("register", {
        logedIn: Auth.checkValidJWT(req),
        status: req.params.status,
    });
});

module.exports = router;
