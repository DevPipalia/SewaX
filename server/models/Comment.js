import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
{
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
    index: true
  },

  message: {
    type: String,
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  images: [
    {
      type: String
    }
  ]

},
{ timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;