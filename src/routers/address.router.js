var addressRouter = require("express").Router();

var AddressController = require('../controllers/address.controller');
var jwt = require('jsonwebtoken');
const passport = require('passport');
var passportConfig = require('../middleware/passport'); // bắt buộc

addressRouter.get("/get",  (req, res) => AddressController.get(req, res));
//passport.authenticate('jwt', { session: false }),
module.exports = addressRouter;
