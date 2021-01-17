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
exports.isAuth = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            return res.status(403).json({
                message: "Not authenticated",
                error: true,
            });
        }
        const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]) || "";
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_PASS || "");
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                return res.status(403).json({
                    message: "Not authenticated",
                    error: {
                        message: "Token expired",
                    },
                });
            }
            else {
                return res.status(403).json({
                    message: "Not authenticated",
                    error: {
                        message: "Error to autenticated",
                    },
                });
            }
        }
        if (!decodedToken) {
            return res.status(403).json({
                message: "Not authenticated!",
                error: true,
            });
        }
        else {
            req.body.userId = decodedToken.userId;
            next();
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Not authenticated",
            error,
        });
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=auth.js.map