var roomRouter = require("express").Router();

var RoomController = require('../controllers/room.controller');
var jwt = require('jsonwebtoken');
const passport = require('passport');
var passportConfig = require('../middleware/passport'); // bắt buộc
var { upload } = require("../middleware/multer.middleware");

roomRouter.post("/create", passport.authenticate('jwt', { session: false }), upload.array('image', 10), (req, res) => RoomController.create(req, res));
roomRouter.get("/get", (req, res) => RoomController.get(req, res));
//passport.authenticate('jwt', { session: false }),
module.exports = roomRouter;
