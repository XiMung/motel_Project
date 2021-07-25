var homeRouter = require("express").Router();

var HomeController = require('../controllers/home.controller');
var jwt = require('jsonwebtoken');
const passport = require('passport');
var passportConfig = require('../middleware/passport'); // bắt buộc

homeRouter.post("/create", (req, res) => HomeController.create(req, res));
homeRouter.get("/get",  (req, res) => HomeController.get(req, res));
//passport.authenticate('jwt', { session: false }),
module.exports = homeRouter;
