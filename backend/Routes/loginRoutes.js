const express = require("express");
const loginController = require("../controller/loginController");

const loginRouter = express.Router();
loginRouter.post("/login", loginController.loginController);

module.exports = loginRouter;