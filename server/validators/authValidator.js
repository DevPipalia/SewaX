import { z } from "zod";



export const registerConstraints= z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Comment message is required")
      .max(50, "Comment must be at most 50 characters"),

      mobile:z
      .string()
      .trim()
      .min(10, "Mobile number should have minimum of 10 digits")
      .max(10, "Mobile number should have maximum of 10 digits"),


      password:z
      .string()
      .trim()

  })
});


export const loginConstraints = z.object({
  body: z.object({
  
      mobile:z
      .string()
      .trim()
      .min(10, "Mobile number should have minimum of 10 digits")
      .max(10, "Mobile number should have maximum of 10 digits"),


      password:z
      .string()
      .trim()

  })
});