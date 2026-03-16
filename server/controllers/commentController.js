import Comment from "../models/Comment.js";

// Add comment to ticket
export const addComment = async (req, res) => {
  try {
    const { message } = req.body;

    const comment = await Comment.create({
      ticketId: req.params.ticketId,
      message,
      createdBy: req.claims.id
    });

    res.status(201).json({
      success: true,
      comment
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get comments for a ticket
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      ticketId: req.params.ticketId
    }).populate("createdBy", "name");

    res.json({
      success: true,
      comments
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};