const express = require("express");
var userRouter = require('./user.router')
var roleRouter = require('./role.router')
var homeRouter = require('./home.router')

const apiRoute = express();

apiRoute.use("/user", userRouter);
apiRoute.use("/role", roleRouter);
apiRoute.use("/home", homeRouter);

module.exports = apiRoute;
