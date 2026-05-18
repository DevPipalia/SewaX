import Ticket from "../models/Ticket.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendSuccessResponse from "../utils/sendSuccessResponse.js";
import AppError from "../utils/appError.js";
import getPagination from "../utils/getPagination.js";


// Create Ticket
export const createTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.create({
    title: req.body.title,
    description: req.body.description,
    flatNo: req.body.flatNo,
    createdBy: req.claims.id,
  });

  sendSuccessResponse(res, {
    statusCode: 201,
    message: "Ticket created successfully",
    data: ticket,
  });
});

// Get tickets created by logged in user
export const getMyTickets = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

 const filter =
   buildTicketFilter(req.query);

  const totalEntries = await Ticket.countDocuments(filter);

  const tickets = await Ticket.find(filter)
    .populate("createdBy", "name mobile")
    .sort({ createdOn: -1 })
    .skip(skip)
    .limit(limit);

  sendSuccessResponse(res, {
    message: "Tickets fetched successfully",
    data: {
      page,
      limit,
      totalEntries,
      totalPages: Math.ceil(totalEntries / limit),
      tickets,
    },
  });
});

export const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate(
    "createdBy",
    "name mobile",
  );

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  sendSuccessResponse(res, {
    message: "Ticket fetched successfully",
    data: ticket,
  });
});

// Admin: Get all tickets
export const getAllTickets = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const filter =
   buildTicketFilter(req.query);
  const totalEntries = await Ticket.countDocuments(filter);

  const tickets = await Ticket.find(filter)
    .populate("createdBy", "name mobile")
    .sort({ createdOn: -1 })
    .skip(skip)
    .limit(limit);

  sendSuccessResponse(res, {
    message: "Tickets fetched successfully",
    data: {
      page,
      limit,
      totalEntries,
      totalPages: Math.ceil(totalEntries / limit),
      tickets,
    },
  });
});

// Admin: Update ticket status
export const updateTicketStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updateData = {
    status,
  };

  if (status === "Resolved") {
    updateData.resolvedOn = new Date();
  } else {
    updateData.resolvedOn = null;
  }

  const ticket = await Ticket.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }
  sendSuccessResponse(res, {
    message: "Ticket status updated successfully",
    data: ticket,
  });
});

// Admin: AssignTo
export const assignTo = asyncHandler(async (req, res) => {
  const { assignedTo } = req.body;

  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { assignedTo },
    { new: true, runValidators: true },
  );

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  sendSuccessResponse(res, {
    message: "Ticket assigned successfully",
    data: ticket,
  });
});

// Admin: Update priority
export const updatePriority = asyncHandler(async (req, res) => {
  const { priority } = req.body;

  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { priority },
    { new: true, runValidators: true },
  );

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  sendSuccessResponse(res, {
    message: "Ticket priority updated successfully",
    data: ticket,
  });
});



const buildTicketFilter = (query) => {

   const filter = {};

   if (query.status) {
      filter.status = query.status;
   }

   if (query.priority) {
      filter.priority = query.priority;
   }

   if (query.flatNo) {
      filter.flatNo = query.flatNo;
   }

   if (query.assignedTo) {
      filter.assignedTo = query.assignedTo;
   }

   return filter;

};