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
exports.getMyPosts = exports.getPost = exports.postPost = exports.getPosts = void 0;
const express_validator_1 = require("express-validator");
const posts_1 = require("./../models/posts");
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield posts_1.Post.find().populate({
            path: "creator",
            select: "name",
        });
        return res.status(201).json({
            message: "Get all posts successfully!",
            data: {
                posts: posts,
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
exports.getPosts = getPosts;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield posts_1.Post.findById(postId);
        if (!post) {
            res.status(401).json({
                message: "No exists post",
                error: true,
            });
        }
        return res.status(200).json({
            message: "Post finded",
            data: {
                post,
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
exports.getPost = getPost;
const getMyPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const posts = yield posts_1.Post.find({ creator: userId });
        return res.status(200).json({
            message: "Get all posts successfully!",
            data: {
                posts: posts,
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
exports.getMyPosts = getMyPosts;
const postPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Bad request for client",
                error: errors.array(),
            });
        }
        const { title, content, userId } = req.body;
        const post = new posts_1.Post({
            title,
            content,
            creator: userId,
        });
        const postSaved = yield post.save();
        return res.status(201).json({
            message: "Post created successfully!",
            data: {
                post: postSaved,
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
exports.postPost = postPost;
//# sourceMappingURL=blog.js.map