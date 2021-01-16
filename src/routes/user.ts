import { Router } from "express";
import { check } from "express-validator";
import * as UserController from "./../controllers/user";

const router = Router();

router.post(
  "/signup",
  [
    check("email", "El email es obligatorio")
      .isEmail()
      .withMessage("El email no es valido")
      .normalizeEmail(),
    check("password", "La contraseña es obligatoria")
      .trim()
      .isLength({ min: 5 })
      .withMessage("La contraseña debe ser minimo de 5 caracteres"),
    check("name", "El nombre el obligatorio").trim().not().isEmpty(),
  ],
  UserController.postUser
);

router.post(
  "/login",
  [
    check("email", "El correo el obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria")
      .trim()
      .isLength({ min: 5 })
      .withMessage("La contraseña debe ser minimo de 5 caracteres"),
  ],
  UserController.loginUser
);

export default router;
