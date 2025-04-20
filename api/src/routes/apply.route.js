import { Router } from "express";
import {
  applyToJob,
  updateApplication,
  deleteApplication,
  getAllApplications,
  getSingleApplication,
} from "../../controllers/apply/index.js";

import { verifyToken } from "../../middlewares/verifyToken.middleware.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";
import { verifyEmployer } from "../middlewares/verifyEmployer.middleware.js";

const router = Router();

router.post("/:jobId", verifyToken, verifyUser, applyToJob);
router.put("/:applicationId", verifyToken, verifyUser, updateApplication);
router.delete("/:applicationId", verifyToken, verifyUser, deleteApplication);
router.get("/", verifyToken, verifyEmployer, getAllApplications);
router.get("/:applicationId", verifyToken, getSingleApplication);

export default router;
