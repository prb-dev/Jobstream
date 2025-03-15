import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";
import { logger } from "./utils/logger.util.js";
import helmet from "helmet";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
