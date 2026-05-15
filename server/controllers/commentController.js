import Comment from "../models/Comment.js";
import Ticket from "../models/Ticket.js";
import asyncHandler from "../utils/asyncHandler.js";

// Add comment to ticket
export const addComment = asyncHandler( async (req, res) => {
    const  message = req.body.message;
    const  ticketId  = req.params.ticketId;

    const ticket = await Ticket.findById(ticketId);

      if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    if 
    (
      req.claims.role !== "admin" &&
      ticket.createdBy.toString() !== req.claims.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to comment on this ticket"
      });
    }

    const comment = await Comment.create({
      ticketId: ticketId,
      message,
      createdBy: req.claims.id
    });

    res.status(201).json({
      success: true,
      comment
    });
 
});

// Get comments for a ticket
export const getComments = asyncHandler( async (req, res) => {

    const comments = await Comment.find({
      ticketId: req.params.ticketId
    }).populate("createdBy", "name");

    res.json({
      success: true,
      comments
    });
  
});