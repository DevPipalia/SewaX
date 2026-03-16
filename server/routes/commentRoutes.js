import express from "express";

import {
  addComment,
  getComments
} from "../controllers/commentController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:ticketId/add", protect, addComment);

router.get("/:ticketId", protect, getComments);

export default router;