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
const UserController = __importStar(require("./../controllers/user"));
const router = express_1.Router();
router.post("/signup", [
    express_validator_1.check("email", "El email es obligatorio")
        .isEmail()
        .withMessage("El email no es valido")
        .normalizeEmail(),
    express_validator_1.check("password", "La contraseña es obligatoria")
        .trim()
        .isLength({ min: 5 })
        .withMessage("La contraseña debe ser minimo de 5 caracteres"),
    express_validator_1.check("name", "El nombre el obligatorio").trim().not().isEmpty(),
], UserController.postUser);
router.post("/login", [
    express_validator_1.check("email", "El correo el obligatorio").isEmail(),
    express_validator_1.check("password", "La contraseña es obligatoria")
        .trim()
        .isLength({ min: 5 })
        .withMessage("La contraseña debe ser minimo de 5 caracteres"),
], UserController.loginUser);
exports.default = router;
//# sourceMappingURL=user.js.map