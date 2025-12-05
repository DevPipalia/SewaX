import express from "express";
import healthRoutes from "./healthRoutes.js";
import authRoutes from "./authRoutes.js";
import protectedRoutes from "./protectedRoutes.js";



const router = express.Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/protected", protectedRoutes);

export default router;
