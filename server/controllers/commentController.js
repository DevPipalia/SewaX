import Comment from "../models/Comment.js";
import Ticket from "../models/Ticket.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendSuccessResponse from "../utils/sendSuccessResponse.js";
import AppError from "../utils/appError.js";

// Add comment to ticket
export const addComment = asyncHandler(async (req, res) => {
  const message = req.body.message;
  const ticketId = req.params.ticketId;

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) 
  {
    throw new AppError("Ticket not found", 404);
  }

  if (req.claims.role !== "admin" && ticket.createdBy.toString() !== req.claims.id) 
  {
    throw new AppError("Not allowed to comment on this ticket", 403);
  }

  const comment = await Comment.create({
    ticketId: ticketId,
    message,
    createdBy: req.claims.id,
  });

  sendSuccessResponse(res, {
    statusCode: 201,
    message: "Comment added successfully",
    data: comment,
  });
});

// Get comments for a ticket
export const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({
    ticketId: req.params.ticketId,
  }).populate("createdBy", "name");

  sendSuccessResponse(res, {
    message: "Comments fetched successfully",
    data: comments,
  });
});
