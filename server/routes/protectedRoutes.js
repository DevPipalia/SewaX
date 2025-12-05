import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "This is a protected route",
    user: req.user
  });
});

export default router;
