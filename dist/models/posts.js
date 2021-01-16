"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});
const Post = mongoose_1.model("Post", PostSchema);
exports.Post = Post;
//# sourceMappingURL=posts.js.map