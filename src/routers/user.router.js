var userRouter = require("express").Router();

var UserController = require('../controllers/user.controller');
var jwt = require('jsonwebtoken');
const passport = require('passport');
var passportConfig = require('../middleware/passport'); // bắt buộc

userRouter.get("/getAll", passport.authenticate('jwt', { session: false }), (req, res) => UserController.getAll(req, res));
userRouter.get("/getOne", passport.authenticate('jwt', { session: false }), (req, res) => UserController.getOne(req, res));
// userRouter.post("/register", passport.authenticate('jwt', { session: false }), (req, res) => UserController.register(req, res));
userRouter.post("/register",(req, res) => UserController.register(req, res));
userRouter.post("/login", (req, res) => UserController.login(req, res));

module.exports = userRouter;
