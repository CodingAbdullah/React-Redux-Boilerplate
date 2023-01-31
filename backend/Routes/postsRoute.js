const express = require("express");
const postsController = require("../controller/postsController");
const auth = require("../middleware/auth");

const postsRouter = express.Router();
postsRouter.post("/posts", auth.auth, postsController.posts); // Pass in the auth middleware to verify JWT token, proceed to make posts if valid

module.exports = postsRouter;