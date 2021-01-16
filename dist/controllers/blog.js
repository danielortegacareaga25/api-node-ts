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
exports.postPost = exports.getPosts = void 0;
const express_validator_1 = require("express-validator");
const posts_1 = require("./../models/posts");
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield posts_1.Post.find();
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
const postPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Bad request for client",
                error: errors.array(),
            });
        }
        const { title, content } = req.body;
        const post = new posts_1.Post({
            title,
            content,
        });
        const postSaved = yield post.save();
        return res.status(201).json({
            message: "Post created successfully!",
            post: postSaved,
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