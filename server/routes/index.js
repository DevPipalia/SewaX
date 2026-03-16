import express from "express";
import healthRoutes from "./healthRoutes.js";
import authRoutes from "./authRoutes.js";
import protectedRoutes from "./protectedRoutes.js";
import ticketRoutes from "./ticketRoutes.js";
import commentRoutes from "./commentRoutes.js";


const router = express.Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/protected", protectedRoutes);
router.use("/tickets", ticketRoutes);
router.use("/comments", commentRoutes);

export default router;
