import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  flatNo: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },

  status: {
    type: String,
    enum: ["open", "in-progress", "resolved"],
    default: "open"
  },

  assignedTo: {
    type: String
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  createdOn: {
    type: Date,
    default: Date.now
  },

  resolvedOn: {
    type: Date
  }

},
{ timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;