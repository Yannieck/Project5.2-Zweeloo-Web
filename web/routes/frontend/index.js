const express = require("express");
const router = express.Router();

router.use('/', require('./frontend.route'));

module.exports = router;