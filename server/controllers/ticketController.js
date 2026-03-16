import Ticket from "../models/Ticket.js";

// Create Ticket
export const createTicket = async (req, res) => {
  try {
    const { title, description, flatNo } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      flatNo,
      createdBy: req.claims.id
    });

    res.status(201).json({
      success: true,
      ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get tickets created by logged in user
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      createdBy: req.claims.id
    });

    res.json({
      success: true,
      tickets
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Admin: Get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("createdBy", "name mobile");

    res.json({
      success: true,
      tickets
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Admin: Update ticket status
export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      ticket
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Admin: AssignTo
export const assignTo = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      { new: true }
    );

    res.json({
      success: true,
      ticket
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Admin: Update priority
export const updatePriority = async (req, res) => {
  try {
    const { priority } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { priority },
      { new: true }
    );

    res.json({
      success: true,
      ticket
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};