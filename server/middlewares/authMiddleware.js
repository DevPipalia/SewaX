import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Not authorized, token missing", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.claims = decoded;

    next();
  } catch (error) {
    throw new AppError("Token is invalid or expired", 401);
  }
};
