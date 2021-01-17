import express, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { connect } from "./database/database";

import blogRoutes from "./routes/blog";
import userRoutes from "./routes/user";
import commentRoutes from "./routes/comment";

const app = express();

app.use(express.json());
app.use("/blog", blogRoutes);
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);

app.use(
  (error: Error | any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error generic", error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  }
);

connect();

app
  .listen(process.env.PORT || 3000, () => {
    return console.log("the server is listening on ", process.env.PORT || 3000);
  })
  .on("error", (err: Error) => console.log(err));
