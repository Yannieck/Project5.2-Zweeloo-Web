const express = require("express");
const router = express.Router();

router.use('/', require('./form.route'));

module.exports = router;