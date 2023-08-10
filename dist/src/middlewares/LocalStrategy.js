"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const passport_local_1 = require("passport-local");
const passport_1 = __importDefault(require("passport"));
passport_1.default.use(new passport_local_1.Strategy(user_model_1.default.authenticate()));
passport_1.default.serializeUser(user_model_1.default.serializeUser());
passport_1.default.deserializeUser(user_model_1.default.deserializeUser());
