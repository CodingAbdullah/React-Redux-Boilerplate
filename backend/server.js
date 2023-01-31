require("dotenv").config({ path: '.env' });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const URI = "mongodb+srv://owner:" + process.env.PASSWORD + "@ai-user-database.zjlsn9q.mongodb.net/?retryWrites=true&w=majority";
const signUpRouter = require("./Routes/signUpRoutes");
const loginRouter = require("./Routes/loginRoutes");
const postsRouter = require('./Routes/postsRoute');

const server = express();

mongoose.connect(URI)
.then(() => console.log("Connection to database successful"))
.catch(err => console.log("Error connecting to database " + err));

server.listen(process.env.PORT || 5001, () => {
    console.log("Listening to PORT " + process.env.PORT || 5001);
});

server.use(express.json({ extended: false }));
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use("/", signUpRouter);
server.use("/", loginRouter);
server.use("/", postsRouter);