const express = require("express");
const router = express.Router();

const APIRouter = require('./api');
const FrontendRouter = require('./frontend');
const AuthRouter = require('./auth');

router.use('/api/routes', APIRouter.Routes);
router.use('/api/sponsors', APIRouter.Sponsors);
router.use('/api/users', APIRouter.Users);
router.use('/api/poi_img', APIRouter.PoiImg);

router.use('/', FrontendRouter);

router.use('/auth', AuthRouter);

module.exports = router;