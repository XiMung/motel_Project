const express = require("express");
const helmet = require("helmet"); // security
// const morgan = require("morgan");
const {connectDatabase} = require("./src/configs/db.config")
const apiRoute = require('./src/routers/router')
connectDatabase();
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

const port = process.env.PORT || 1998;
app.use("/api", apiRoute);


app.listen(port, () =>{
    console.log("Successfully with port: " + port);
})