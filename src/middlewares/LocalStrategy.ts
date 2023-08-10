import User from "../models/user.model";
import { Strategy } from "passport-local";
import passport from "passport";

passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser() as any);
passport.deserializeUser(User.deserializeUser() as any);
