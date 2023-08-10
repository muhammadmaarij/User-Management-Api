import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
import User from "../models/user.model";
import passport from "passport";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(options, (payload, done: VerifiedCallback) => {
    User.findById({ _id: payload._id })
      .then((user: any) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err, false, { message: "Couldn't find user" });
      });
  })
);
