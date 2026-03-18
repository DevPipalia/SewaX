import { z } from "zod";


const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ticket id");


export const createTicketConstraints = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters"),

    description: z
      .string()
      .trim()
      .min(5, "Description must be at least 5 characters")
      .max(1000, "Description must be at most 1000 characters"),

    flatNo: z
      .string()
      .trim()
      .min(1, "Flat number is required")
      .max(20, "Correct flat number is required")
  })
});

export const updateTicketStatusConstraints = z.object({
    params: z.object({
    id: objectIdSchema
  }),
  body: z.object({
    status: z.enum(["Open", "In-progress", "Resolved"], {
      errorMap: () => ({
        message: "Status must be one of: Open, In-progress, Resolved"
      })
    })
  })
});

export const updateTicketPriorityConstraints = z.object({
    params: z.object({
    id: objectIdSchema
  }),
  body: z.object({
    priority: z.enum(["Low", "Medium", "High"], {
      errorMap: () => ({
        message: "Priority must be one of: Low, Medium, High"
      })
    })
  })
});

export const assignToConstraints = z.object({
    params: z.object({
    id: objectIdSchema
  }),
  body: z.object({
    assignedTo: z
      .string()
      .trim()
  })
});