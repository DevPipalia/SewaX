import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
     console.log("DB connection failed (expected during development). Continuing...");
    // process.exit(1);
  }
};

export default connectDB;
