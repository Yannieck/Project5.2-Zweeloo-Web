const express = require("express");
const router = express.Router();

router.use('/', require('./auth.route'));

module.exports = router;