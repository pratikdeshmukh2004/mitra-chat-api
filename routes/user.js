const express = require("express");
const userService = require("../services/userService");
const userRouter = express.Router();
const { SignUp, Login } = require("../controllers/userController");


userRouter.post("/signup",SignUp)
userRouter.post("/login",Login)


module.exports = userRouter;
