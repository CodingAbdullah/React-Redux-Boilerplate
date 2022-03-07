const express = require("express");
const signUpController = require("../controller/signUpController");

const signUpRouter = express.Router();
signUpRouter.post("/register", signUpController.signUpController);

module.exports = signUpRouter;