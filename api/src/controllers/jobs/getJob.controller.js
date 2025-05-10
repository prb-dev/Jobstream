import { Job } from "../../models/job.model.js";
import { logger } from "../../utils/logger.util.js";
import { validateGetJob } from "../../utils/validator.util.js";
import { customError } from "../../utils/error.util.js";

export const getJob = async (req, res, next) => {
  const { error, value } = validateGetJob(req.params);

  if (error) return next(error);

  const { id } = value;

  try {
    const job = await Job.findById(id);

    if (!job) {
      const error = customError(404, "Job not found");
      logger.error(`Job with id ${id} not found: `, error);
      return next(error);
    }

    logger.info(`Job with id ${id} fetched successfully.`);
    res.status(200).json(job);
  } catch (error) {
    logger.error("Error fetching job: ", error);
    next(error);
  }
};
