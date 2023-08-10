"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.UserSignIn = exports.UserSignUp = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const authentication_1 = require("../middlewares/authentication");
const UserSignUp = (req, res, next) => {
    if (!req.body.fullName) {
        res.statusCode = 500;
        res.send({
            name: "No Name Error",
            message: "The name is required",
        });
    }
    else {
        user_model_1.default.register(new user_model_1.default(req.body), req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.send(err);
                next(err);
            }
            else {
                user.fullName = req.body.fullName;
                user.email = req.body.email;
                const token = (0, authentication_1.getToken)({ _id: user._id });
                const refreshToken = (0, authentication_1.getRefreshToken)({ _id: user._id });
                user.refreshToken.push({ refreshToken });
                user
                    .save(req.body)
                    .then(() => {
                    console.log("asas");
                    res.cookie("refreshToken", refreshToken, authentication_1.COOKIE_OPTIONS);
                    res.send({ success: true, token });
                })
                    .catch((err) => {
                    res.statusCode = 500;
                    res.send(err);
                    next(err);
                });
            }
        });
    }
};
exports.UserSignUp = UserSignUp;
const UserSignIn = (req, res, next) => {
    const user = req.user;
    console.log(req.user);
    if (req.user) {
        const token = (0, authentication_1.getToken)({ _id: user._id });
        const refreshToken = (0, authentication_1.getRefreshToken)({ _id: user._id });
        user_model_1.default.findById(user._id).then((user) => {
            user.refreshToken.push({ refreshToken });
            user
                .save()
                .then(() => {
                res.cookie("refreshToken", refreshToken, authentication_1.COOKIE_OPTIONS);
                res.send({ success: true, token });
            })
                .catch((err) => {
                res.statusCode = 500;
                res.send(err);
                next(err);
            });
        }, (err) => next(err));
    }
};
exports.UserSignIn = UserSignIn;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("heree");
    try {
        const users = yield user_model_1.default.find();
        console.log(users);
        res.json(users);
    }
    catch (error) {
        console.log("adsd");
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update user" });
    }
});
exports.updateUser = updateUser;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id; // Extract user ID from route parameters
    try {
        const deletedUser = yield user_model_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete user" });
    }
});
exports.deleteUserById = deleteUserById;
