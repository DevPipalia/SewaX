import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message:`This is a protected route with user id: ${req.claims.id} and role: ${req.claims.role} and name :${req.claims.name}`,
    claims: req.claims
  });
});

export default router;
