import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "./../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Bad request for client",
        error: errors.array(),
      });
    }

    const { email, name, password } = req.body;

    const exitsUser = await User.findOne({ email });
    if (exitsUser) {
      return res.status(400).json({
        message: "User already exists",
        error: {
          message: "The user exists",
        },
      });
    }

    const salt = await bcrypt.genSalt(12);

    const passwordEncrypted = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      name,
      password: passwordEncrypted,
    });

    const userSaved = await user.save();

    return res.status(200).json({
      message: "User created successfully",
      data: {
        user: userSaved,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something happens!",
      error: error,
    });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Bad request for client",
        error: errors.array(),
      });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "The email is incorrect!",
      });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      return res.status(400).json({
        message: "The password is incorrect!",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.SECRET_PASS || "",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something happens!",
      error: error,
    });
  }
};

export { postUser, loginUser };
