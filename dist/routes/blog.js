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
const BlogController = __importStar(require("./../controllers/blog"));
const router = express_1.Router();
router.get("/posts", BlogController.getPosts);
router.post("/posts", [
    express_validator_1.check("title", "El titulo es requerido")
        .trim()
        .isLength({ min: 5 })
        .withMessage("El titulo no es valido, debe tener minimo 5 caracteres"),
    express_validator_1.check("content")
        .trim()
        .isLength({ min: 5 })
        .withMessage("El contenido no es valido, debe tener minimo 5 caracteres"),
], BlogController.postPost);
exports.default = router;
//# sourceMappingURL=blog.js.map