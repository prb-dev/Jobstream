import mongoose from "mongoose";
import { logger } from "../utils/logger.util.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("Connected to database");
  } catch (error) {
    logger.error("Error connecting to database: ", error);
  }
};
