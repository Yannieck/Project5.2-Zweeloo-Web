const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

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
