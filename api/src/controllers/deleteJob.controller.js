import { Job } from "../models/job.model.js";
import { customError } from "../utils/error.util.js";

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return next(customError(404, "Job not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
