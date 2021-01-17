"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPost = exports.postComment = void 0;
const express_validator_1 = require("express-validator");
const comments_1 = require("./../models/comments");
const postComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Bad request for client",
                error: errors.array(),
            });
        }
        const { content, post, userId } = req.body;
        const comment = new comments_1.Comment({
            content,
            post,
            creator: userId,
        });
        const commentSave = yield comment.save();
        return res.status(201).json({
            message: "Comment created succesfully!",
            data: {
                comment: commentSave,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something happens!",
            error: error,
        });
    }
});
exports.postComment = postComment;
const getCommentsByPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Bad request for client",
                error: errors.array(),
            });
        }
        const { postId } = req.params;
        const comments = yield comments_1.Comment.find({ post: postId });
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
    }
    catch (error) {
        return res.status(500).json({
            message: "Something happens!",
            error: error,
        });
    }
});
exports.getCommentsByPost = getCommentsByPost;
//# sourceMappingURL=comment.js.map