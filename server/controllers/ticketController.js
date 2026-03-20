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
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



export const getTicketById = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Admin: Get all tickets
export const getAllTickets = async (req, res) => {
  try {
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
      { new: true }
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