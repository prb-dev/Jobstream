import { Router } from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

const router = Router();

// POST /api/jobs - Create a new job
router.post("/", createJob);

// GET /api/jobs - Get all jobs
router.get("/", getAllJobs);

// GET /api/jobs/:id - Get one job by ID
router.get("/:id", getJobById);

// PUT /api/jobs/:id - Update a job by ID
router.put("/:id", updateJob);

// DELETE /api/jobs/:id - Delete a job by ID
router.delete("/:id", deleteJob);

export default router;
