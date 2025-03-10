import { Router } from "express";
import { createJob } from "../controllers/createJob.controller.js";
import { updateJob } from "../controllers/updateJob.controller.js";
import { deleteJob } from "../controllers/deleteJob.controller.js";

const router = Router();

// Create a new job
router.post("/", createJob);

// Update an existing job
router.put("/:id", updateJob);

// Delete a job
router.delete("/:id", deleteJob);

export default router;
