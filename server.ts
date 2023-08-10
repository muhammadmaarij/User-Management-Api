import express, { Express } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import userRouter from "./src/routes/user.route";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";
require("./src/middlewares/LocalStrategy");
require("./src/middlewares/JwtStrategy");
require("./src/middlewares/authentication");

import cors from "cors";

const app: Express = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connect = mongoose.connect("mongodb://127.0.0.1:27017/users-db");
connect
  .then((db) => console.log("connected to db"))
  .catch((err) => {
    console.log(err);
  });

// setup cors
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(cookieParser(process.env.COOKIE_SECRET as string));
app.use(passport.initialize());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
