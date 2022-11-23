const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const auth = require("../../middleware/auth");

router.get("/", (req, res) => {
    res.render("index", { logedIn: req.cookies.hasOwnProperty("jwt") });
});

router.get("/login", (req, res) => {
    res.render("login", { logedIn: req.cookies.hasOwnProperty("jwt") });
});

router.get("/login/:status", (req, res) => {
    res.render("login", { logedIn: req.cookies.hasOwnProperty("jwt"), status: req.params.status });
});

router.get("/routeeditor/:id", auth, (req, res) => {
    const id = parseInt(req.params.id);
    const url = "http://localhost:3000/api/routes/route/" + id;
    axios
        .get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept-Type": "application/json",
            },
        })
        .then((response) => {
            const route = response.data;
            if (response.status === 200) {
                return res.render("route-editor", {
                    route: route,
                    logedIn: req.cookies.hasOwnProperty("jwt"),
                });
            } else {
                return res.render("route-selection", {
                    logedIn: req.cookies.hasOwnProperty("jwt"),
                });
            }
        })
        .catch((e) => {
            return res.render("route-selection", {
                logedIn: req.cookies.hasOwnProperty("jwt"),
            });
        });
});

router.get("/routeselection", auth, (req, res) => {
    res.render("route-selection", {
        logedIn: req.cookies.hasOwnProperty("jwt"),
    });
});

router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/login");
});

router.get("/profile", auth, (req, res) => {
    res.render("profile", {
        user: req.user.user,
        logedIn: req.cookies.hasOwnProperty("jwt"),
    });
});

router.get("/register", auth, (req, res) => {
    res.render("register", { logedIn: req.cookies.hasOwnProperty("jwt")});
});

router.get("/register/:status", auth, (req, res) => {
    res.render("register", { logedIn: req.cookies.hasOwnProperty("jwt"), status: req.params.status });
});

module.exports = router;
