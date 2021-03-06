var roleRouter = require("express").Router();

var RoleController = require('../controllers/role.controller');
var jwt = require('jsonwebtoken');
const passport = require('passport');
var passportConfig = require('../middleware/passport'); // bắt buộc

roleRouter.post("/create", passport.authenticate('jwt', { session: false }), (req, res) => RoleController.create(req, res));
roleRouter.get("/get", (req, res) => RoleController.get(req, res));
module.exports = roleRouter;
