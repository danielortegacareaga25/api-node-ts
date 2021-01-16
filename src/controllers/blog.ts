import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Post } from "./../models/posts";

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find();
    return res.status(201).json({
      message: "Get all posts successfully!",
      data: {
        posts: posts,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something happens!",
      error: error,
    });
  }
};

const postPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Bad request for client",
        error: errors.array(),
      });
    }
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
    });
    const postSaved = await post.save();

    return res.status(201).json({
      message: "Post created successfully!",
      post: postSaved,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something happens!",
      error: error,
    });
  }
};

export { getPosts, postPost };
