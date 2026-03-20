import express from "express";

import {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus,
  updatePriority,
  assignTo,
  getTicketById
} from "../controllers/ticketController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { assignToConstraints, createTicketConstraints, updateTicketPriorityConstraints, updateTicketStatusConstraints } from "../validators/ticketValidator.js";
import { validate } from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", protect,validate(createTicketConstraints), createTicket);

router.get("/my", protect, getMyTickets);

router.get("/:id", protect, getTicketById);

router.get("/all", protect,isAdmin, getAllTickets);

router.post("/:id/updateStatus", protect,isAdmin, validate(updateTicketStatusConstraints), updateTicketStatus);

router.post("/:id/assign", protect,isAdmin, validate(assignToConstraints), assignTo);

router.post("/:id/updatePriority", protect,isAdmin,validate(updateTicketPriorityConstraints) ,updatePriority);

export default router;