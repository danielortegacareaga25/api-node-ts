import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Comment } from "./../models/comments";

const postComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Bad request for client",
        error: errors.array(),
      });
    }
    const { content, post, userId } = req.body;
    const comment = new Comment({
      content,
      post,
      creator: userId,
    });
    const commentSave = await comment.save();

    return res.status(201).json({
      message: "Comment created succesfully!",
      data: {
        comment: commentSave,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something happens!",
      error: error,
    });
  }
};

const getCommentsByPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Bad request for client",
        error: errors.array(),
      });
    }
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId as any });
    if (!comments) {
      return res.status(400).json({
        message: "not comments finded!",
        error: true,
      });
    }

    return res.status(200).json({
      message: "get comments succesfully!",
      data: {
        comments: comments,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something happens!",
      error: error,
    });
  }
};
export { postComment, getCommentsByPost };
