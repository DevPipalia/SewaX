import { z } from "zod";


const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ticket id");


export const addCommentConstraints= z.object({
    params: z.object({
    ticketId: objectIdSchema
  }),
  body: z.object({
    message: z
      .string()
      .trim()
      .min(1, "Comment message is required")
      .max(1000, "Comment must be at most 1000 characters")
  })
});


export const getCommentsConstraints = z.object({
  params: z.object({
    ticketId: objectIdSchema
  })
});