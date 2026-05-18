import { ZodError } from "zod";
import AppError from "../utils/appError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      throw new AppError(
        "Validation failed",
        400,
        error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      );
    }

    throw new AppError("Something went wrong during validation", 500);
  }
};
