"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const user_model_1 = __importDefault(require("../models/user.model"));
const passport_1 = __importDefault(require("passport"));
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (payload, done) => {
    user_model_1.default.findById({ _id: payload._id })
        .then((user) => {
        return done(null, user);
    })
        .catch((err) => {
        return done(err, false, { message: "Couldn't find user" });
    });
}));
