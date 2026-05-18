import AppError from "../utils/appError.js";

export const isAdmin = (req, res, next) => {
  if (!req.claims) {
    throw new AppError("Not authorized", 401);
  }

  if (req.claims.role !== "admin") {
    throw new AppError("Access denied. Admin only.", 403);
  }

  next();
};
