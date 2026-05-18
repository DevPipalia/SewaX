import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import sendSuccessResponse from "../utils/sendSuccessResponse.js";

export const register = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({
    mobile: req.body.mobile,
  });

  if (userExists) 
  {
    throw new AppError("Mobile already registered", 400);
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name: req.body.name,
    mobile: req.body.mobile,
    password: hashedPassword,
  });

  sendSuccessResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: {
      id: user._id,
      name: user.name,
      mobile: user.mobile,
    },
  });
});

// -------------------- LOGIN --------------------
export const login = asyncHandler(async (req, res) => {
  const { mobile, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ mobile });
  if (!user) 
  {
    throw new AppError("Invalid credentials", 401);
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) 
  {
    throw new AppError("Invalid credentials", 401);
  }

  // Create JWT token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  sendSuccessResponse(res, {
    statusCode: 200,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
      },
    },
  });
});
