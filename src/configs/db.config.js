const mongoose = require('mongoose')

const connectDatabase = (req, res) => {
    //   const mongoDbUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    const mongoDbUrl = "mongodb+srv://quanghieu221998:quanghieu@cluster0.yrba1.mongodb.net/MotelDB?retryWrites=true&w=majority"
    // const mongoDbUrl = `mongodb://localhost:27017/Motel_Project`
    console.log(`Connecting to ${mongoDbUrl}`);
    // Connecting to the database
    mongoose
        .connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log("Successfully connected to the database");
        })
        .catch((err) => {
            console.log(`Could not connect to the database. Exiting now...\n${err}`);
            return;
        });
};

module.exports = {connectDatabase: connectDatabase}
