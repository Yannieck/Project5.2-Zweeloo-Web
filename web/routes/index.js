const express = require("express");
const router = express.Router();

const APIRouter = require('./api');
const FrontendRouter = require('./frontend');
const AuthRouter = require('./auth');
const FormsRouter = require('./form');

router.use('/api/routes', APIRouter.Routes);
router.use('/api/sponsors', APIRouter.Sponsors);
router.use('/api/users', APIRouter.Users);
router.use('/api/poi', APIRouter.Poi);

router.use('/', FrontendRouter);

router.use('/auth', AuthRouter);
router.use('/form', FormsRouter);

module.exports = router;