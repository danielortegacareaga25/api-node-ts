import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(403).json({
        message: "Not authenticated",
        error: true,
      });
    }
    const token = authHeader?.split(" ")[1] || "";
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_PASS || "");
    } catch (error) {
      return res.status(403).json({
        message: "Not authenticated",
        error: {
          message: "Error to autenticated",
        },
      });
    }
    console.log("decodedToken", decodedToken);
    if (!decodedToken) {
      return res.status(403).json({
        message: "Not authenticated!",
        error: true,
      });
    }
    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Not authenticated",
      error,
    });
  }
};

export { isAuth };
