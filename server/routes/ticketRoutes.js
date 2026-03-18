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
import { assignToConstraints, createTicketConstraints, updateTicketPriorityConstraints, updateTicketStatusConstraints } from "../validators/ticketValidator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/create", protect,validate(createTicketConstraints), createTicket);

router.get("/my", protect, getMyTickets);

router.get("/all", protect, getAllTickets);

router.post("/:id/updateStatus", protect,validate(updateTicketStatusConstraints), updateTicketStatus);

router.post("/:id/assign", protect,validate(assignToConstraints), assignTo);

router.post("/:id/updatePriority", protect,validate(updateTicketPriorityConstraints) ,updatePriority);

export default router;