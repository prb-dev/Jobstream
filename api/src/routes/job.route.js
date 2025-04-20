import { Router } from "express";
import {
  createJob,
  updateJob,
  deleteJob,
  filterJobs,
  getJob,
} from "../controllers/jobs/index.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { verifyEmployer } from "../middlewares/verifyEmployer.middleware.js";

const router = Router();

router.post("/", verifyToken, verifyEmployer, createJob);
router.put("/:id", verifyToken, verifyEmployer, updateJob);
router.delete("/:id", verifyToken, verifyEmployer, deleteJob);
router.get("/", filterJobs);
router.get("/:id", getJob);

export default router;
