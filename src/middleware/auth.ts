import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      res.status(403).json({
        message: "Not authenticated",
        error: true,
      });
    }
    console.log("authHeader", authHeader);
    const token = authHeader?.split(" ")[1] || "";
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_PASS || "");
    } catch (error) {
      res.status(403).json({
        message: "Not authenticated",
        error: {
          message: "Error to autenticated",
        },
      });
    }
    console.log("decodedToken", decodedToken);
    if (!decodedToken) {
      res.status(403).json({
        message: "Not authenticated!",
        error: true,
      });
    }
    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Not authenticated",
      error,
    });
  }
};

export { isAuth };
