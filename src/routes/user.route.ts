import { Router } from "express";
import {
  UserSignUp,
  UserSignIn,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
} from "../controllers/user.controller";
import passport from "passport";
import { verifyUser } from "../middlewares/authentication";

const userRouter = Router();

userRouter.post("/signup", UserSignUp);

userRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  UserSignIn
);

userRouter.get("/", verifyUser, getAllUsers);

userRouter.get("/:id", verifyUser, getUserById);

userRouter.put("/:id", verifyUser, updateUser);

userRouter.delete("/:id", verifyUser, deleteUserById);

export default userRouter;
