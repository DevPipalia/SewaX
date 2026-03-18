import express from "express";

import {
  addComment,
  getComments
} from "../controllers/commentController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { addCommentConstraints, getCommentsConstraints } from "../validators/commentValidator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/:ticketId/add", protect, validate(addCommentConstraints), addComment);

router.get("/:ticketId", protect, validate(getCommentsConstraints),getComments);

export default router;