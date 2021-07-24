const express = require("express");
var userRouter = require('./user.router')
var roleRouter = require('./role.router')

const apiRoute = express();

apiRoute.use("/user", userRouter);
apiRoute.use("/role", roleRouter);


module.exports = apiRoute;
