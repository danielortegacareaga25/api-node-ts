import { Router } from "express";
import { check } from "express-validator";
import * as BlogController from "./../controllers/blog";

const router = Router();

router.get("/posts", BlogController.getPosts);

router.post(
  "/posts",
  [
    check("title", "El titulo es requerido")
      .trim()
      .isLength({ min: 5 })
      .withMessage("El titulo no es valido, debe tener minimo 5 caracteres"),
    check("content")
      .trim()
      .isLength({ min: 5 })
      .withMessage("El contenido no es valido, debe tener minimo 5 caracteres"),
  ],
  BlogController.postPost
);

export default router;
