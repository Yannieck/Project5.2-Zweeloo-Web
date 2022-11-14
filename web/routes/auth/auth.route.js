const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const authcontroller = require('../../bin/authcontroller');
const ContentTypeCheck = require('../../middleware/contenttypecheck');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/login', ContentTypeCheck.checkLogin, authcontroller.login);

router.post('/register', auth, ContentTypeCheck.checkRegister, authcontroller.register);

module.exports = router;