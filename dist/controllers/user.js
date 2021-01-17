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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.postUser = void 0;
const express_validator_1 = require("express-validator");
const user_1 = require("./../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Bad request for client",
                error: errors.array(),
            });
        }
        const { email, name, password } = req.body;
        const exitsUser = yield user_1.User.findOne({ email });
        if (exitsUser) {
            return res.status(400).json({
                message: "User already exists",
                error: {
                    message: "The user exists",
                },
            });
        }
        const salt = yield bcrypt_1.default.genSalt(12);
        const passwordEncrypted = yield bcrypt_1.default.hash(password, salt);
        const user = new user_1.User({
            email,
            name,
            password: passwordEncrypted,
        });
        const userSaved = yield user.save();
        return res.status(200).json({
            message: "User created successfully",
            data: {
                user: userSaved,
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
exports.postUser = postUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Bad request for client",
                error: errors.array(),
            });
        }
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "The email is incorrect!",
            });
        }
        const isSamePassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isSamePassword) {
            return res.status(400).json({
                message: "The password is incorrect!",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            userId: user._id.toString(),
        }, process.env.SECRET_PASS || "", {
            expiresIn: "1h",
        });
        res.status(200).json({
            token,
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something happens!",
            error: error,
        });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.js.map