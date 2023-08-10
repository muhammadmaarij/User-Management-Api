import { Response, Request, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import {
  COOKIE_OPTIONS,
  getRefreshToken,
  getToken,
} from "../middlewares/authentication";
import passport from "passport";

interface Id {
  _id: string;
}

export const UserSignUp = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.fullName) {
    res.statusCode = 500;
    res.send({
      name: "No Name Error",
      message: "The name is required",
    });
  } else {
    User.register(new User(req.body), req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.send(err);
        next(err);
      } else {
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        const token = getToken({ _id: user._id });
        const refreshToken = getRefreshToken({ _id: user._id });
        user.refreshToken.push({ refreshToken });
        user
          .save(req.body)
          .then(() => {
            console.log("asas");
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.send({ success: true, token });
          })
          .catch((err: any) => {
            res.statusCode = 500;
            res.send(err);
            next(err);
          });
      }
    });
  }
};

export const UserSignIn = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as Id;
  console.log(req.user);
  if (req.user) {
    const token = getToken({ _id: user._id });
    const refreshToken = getRefreshToken({ _id: user._id });
    User.findById(user._id).then(
      (user: any) => {
        user.refreshToken.push({ refreshToken });
        user
          .save()
          .then(() => {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.send({ success: true, token });
          })
          .catch((err: any) => {
            res.statusCode = 500;
            res.send(err);
            next(err);
          });
      },
      (err) => next(err)
    );
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  console.log("heree");
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.log("adsd");
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const userId = req.params.id; // Extract user ID from route parameters

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
