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
    res.render("register", { logedIn: req.cookies.hasOwnProperty("jwt") });
});

router.get("/settings", (req, res) => {
    if (req.cookies.contenttype) {
        return res.render("settings", {
            logedIn: req.cookies.hasOwnProperty("jwt"),
        });
    } else {
        return res
            .cookie("contenttype", "JSON", {
                expires: new Date(Date.now() + 2147483647999),
                httpOnly: false,
                sameSite: "Strict",
                secure: true,
            })
            .render("settings", { logedIn: req.cookies.hasOwnProperty("jwt") });
    }
});

router.post("/settings", (req, res) => {
    const type = req.body.content_type;
    if (type === "XML") {
        return res
            .cookie("contenttype", "XML", {
                expires: new Date(Date.now() + 2147483647999),
                httpOnly: false,
                sameSite: "Strict",
                secure: true,
            })
            .render("index", { logedIn: req.cookies.hasOwnProperty("jwt") });
    } else {
        return res
            .cookie("contenttype", "JSON", {
                expires: new Date(Date.now() + 2147483647999),
                httpOnly: false,
                sameSite: "Strict",
                secure: true,
            })
            .render("index", { logedIn: req.cookies.hasOwnProperty("jwt") });
    }
});

module.exports = router;
