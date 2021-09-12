var homeRouter = require("express").Router();

var HomeController = require('../controllers/home.controller');
var jwt = require('jsonwebtoken');
const passport = require('passport');
var passportConfig = require('../middleware/passport'); // bắt buộc

var multer = require('multer');
const upload = multer();

homeRouter.post("/create",  upload.any(), (req, res) => {HomeController.create(req, res)});
homeRouter.get("/get",  (req, res) => HomeController.get(req, res));
//passport.authenticate('jwt', { session: false }),
module.exports = homeRouter;
