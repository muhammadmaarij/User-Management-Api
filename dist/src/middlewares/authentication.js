"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.getRefreshToken = exports.getToken = exports.COOKIE_OPTIONS = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    signed: true,
    sameSite: true,
};
const getToken = (user) => {
    return jsonwebtoken_1.default.sign(user, SECRET_KEY, {
        expiresIn: 60 * 15,
    });
};
exports.getToken = getToken;
const getRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign(user, REFRESH_TOKEN, {
        expiresIn: 1000 * 60 * 60 * 24 * 30,
    });
};
exports.getRefreshToken = getRefreshToken;
exports.verifyUser = passport_1.default.authenticate("jwt", { session: false });
