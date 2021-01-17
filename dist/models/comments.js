"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});
const Comment = mongoose_1.model("Comment", CommentSchema);
exports.Comment = Comment;
//# sourceMappingURL=comments.js.map