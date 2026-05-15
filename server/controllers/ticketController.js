import Ticket from "../models/Ticket.js";
import asyncHandler from "../utils/asyncHandler.js";


// Create Ticket
export const createTicket = asyncHandler(async (req, res) => {

   const ticket = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      flatNo: req.body.flatNo,
      createdBy: req.claims.id
   });

   res.status(201).json({
      success: true,
      ticket
   });

});

// Get tickets created by logged in user
export const getMyTickets = asyncHandler( async (req, res) => {
  
     const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter={}
    filter.createdBy = req.claims.id;

     if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.flatNo) {
      filter.flatNo = req.query.flatNo;
    }

    if (req.query.assignedTo) {
      filter.assignedTo = req.query.assignedTo;
    }

    const totalEntries = await Ticket.countDocuments(filter);

    const tickets = await Ticket.find(filter)
      .populate("createdBy", "name mobile")
      .sort({ createdOn: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      page,
      limit,
      totalEntries,
      totalPages: Math.ceil(totalEntries / limit),
      tickets
    });
  
});



export const getTicketById = asyncHandler(async (req, res) => {

    const ticket = await Ticket.findById(req.params.id)
      .populate("createdBy", "name mobile");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    res.json({
      success: true,
      ticket
    });
  
});


// Admin: Get all tickets
export const getAllTickets = asyncHandler( async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter={}

     if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.flatNo) {
      filter.flatNo = req.query.flatNo;
    }

    if (req.query.assignedTo) {
      filter.assignedTo = req.query.assignedTo;
    }

    const totalEntries = await Ticket.countDocuments(filter);

    const tickets = await Ticket.find(filter)
      .populate("createdBy", "name mobile")
      .sort({ createdOn: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      page,
      limit,
      totalEntries,
      totalPages: Math.ceil(totalEntries / limit),
      tickets
    });
  
});

// Admin: Update ticket status
export const updateTicketStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;
    const updateData = {
          status
        };

    if (status === "Resolved") 
    {
      updateData.resolvedOn = new Date();
    } 
    else 
    {
      updateData.resolvedOn = null;
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, 
        runValidators: true
      }
    );

    if (!ticket) {
  return res.status(500).json({
    success: false,
    message: "Ticket not found"
  });
}

    res.json({
      success: true,
      ticket
    });
  
});

// Admin: AssignTo
export const assignTo = asyncHandler(async (req, res) => {
  
    const { assignedTo } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      { new: true,
        runValidators: true
       }
    );

    res.json({
      success: true,
      ticket
    });
  
});

// Admin: Update priority
export const updatePriority =asyncHandler( async (req, res) => {
    const { priority } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { priority },
      { new: true,
        runValidators: true
       }
    );

    res.json({
      success: true,
      ticket
    });
  
});