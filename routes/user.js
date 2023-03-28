const express = require("express");
const userService = require("../services/userService");
const userRouter = express.Router();
const { SignUp, Login, getUser } = require("../controllers/userController");


userRouter.post("/auth/register",SignUp)
userRouter.post("/auth/login",Login)
userRouter.post("/auth/me",getUser)


module.exports = userRouter;
