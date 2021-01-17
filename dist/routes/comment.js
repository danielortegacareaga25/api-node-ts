"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("./../middleware/auth");
const CommentController = __importStar(require("./../controllers/comment"));
const router = express_1.Router();
router.get("/:postId", auth_1.isAuth, CommentController.getCommentsByPost);
router.post("/create", auth_1.isAuth, [
    express_validator_1.check("content", "El contenido el obligatorio")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 5 })
        .withMessage("Debe tener minimo 5 caracteres el comentario"),
    express_validator_1.check("post", "El id del post el obligatorio").trim().not().isEmpty(),
], CommentController.postComment);
exports.default = router;
//# sourceMappingURL=comment.js.map