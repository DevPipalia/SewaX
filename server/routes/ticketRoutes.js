import express from "express";

import {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus,
  updatePriority,
  assignTo
} from "../controllers/ticketController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createTicket);

router.get("/my", protect, getMyTickets);

router.get("/all", protect, getAllTickets);

router.post("/:id/updateStatus", protect, updateTicketStatus);

router.post("/:id/assign", protect, assignTo);

router.post("/:id/updatePriority", protect, updatePriority);

export default router;