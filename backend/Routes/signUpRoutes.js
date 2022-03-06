const express = require("express");
const signUpController = require("../controller/signUpController");

const signUpRouter = express.Router();
signUpRouter.post("/signup", signUpController.signUpController);

module.exports = signUpRouter;