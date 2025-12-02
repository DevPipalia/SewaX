import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
