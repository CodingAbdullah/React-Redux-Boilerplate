require("dotenv").config({ path: '.env' });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const URI = "mongodb+srv://" + process.env.USERNAME + ":" + process.env.PASSWORD + "@cluster0.sftye.mongodb.net/" + process.env.DATABASE + "?retryWrites=true&w=majority";
const signUpRouter = require("./Routes/signUpRoutes");
const loginRouter = require("./Routes/loginRoutes");

const server = express();

mongoose.connect(URI, {
    dbName: process.env.DATABASE
})
.then(() => console.log("Connection to database successful"))
.catch(err => console.log("Error connecting to database " + err));

server.listen(process.env.PORT || 3001, () => {
    console.log("Listening to PORT " + process.env.PORT || 3001);
});

server.use(express.json());
server.use(cors());
server.use("/", signUpRouter);
server.use("/", loginRouter);