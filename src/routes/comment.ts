import { Router } from "express";
import { check } from "express-validator";
import { isAuth } from "./../middleware/auth";
import * as CommentController from "./../controllers/comment";

const router = Router();
router.get("/:postId", isAuth, CommentController.getCommentsByPost);

router.post(
  "/create",
  isAuth,
  [
    check("content", "El contenido el obligatorio")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 5 })
      .withMessage("Debe tener minimo 5 caracteres el comentario"),
    check("post", "El id del post el obligatorio").trim().not().isEmpty(),
  ],
  CommentController.postComment
);

export default router;
