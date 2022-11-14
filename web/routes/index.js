const express = require("express");
const router = express.Router();

const APIRouter = require('./api');
const FrontendRouter = require('./frontend');
const AuthRouter = require('./auth');

router.use('/api/geofences', APIRouter.Geofences);
router.use('/api/routes', APIRouter.Routes);
router.use('/api/users', APIRouter.Users);

router.use('/', FrontendRouter);

router.use('/auth', AuthRouter);

module.exports = router;