import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {

   const userExists = await User.findOne({
      mobile: req.body.mobile
   });

   if (userExists) {
      return res.status(400).json({
         success: false,
         message: "Mobile already registered"
      });
   }

   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   const user = await User.create({
      name: req.body.name,
      mobile: req.body.mobile,
      password: hashedPassword
   });

   return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
         id: user._id,
         name: user.name,
         mobile: user.mobile
      }
   });

});

// -------------------- LOGIN --------------------
export const login = asyncHandler(async (req, res) => 
  {
    const { mobile, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name:user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role
      }
    });
  
});