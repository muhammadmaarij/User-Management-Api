"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const passport_1 = __importDefault(require("passport"));
const authentication_1 = require("../middlewares/authentication");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", user_controller_1.UserSignUp);
userRouter.post("/signin", passport_1.default.authenticate("local", { session: false }), user_controller_1.UserSignIn);
userRouter.get("/", authentication_1.verifyUser, user_controller_1.getAllUsers);
userRouter.get("/:id", authentication_1.verifyUser, user_controller_1.getUserById);
userRouter.put("/:id", authentication_1.verifyUser, user_controller_1.updateUser);
userRouter.delete("/:id", authentication_1.verifyUser, user_controller_1.deleteUserById);
exports.default = userRouter;
