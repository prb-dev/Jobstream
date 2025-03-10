import { Job } from "../models/job.model.js";
import { customError } from "../utils/error.util.js";

export const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, company, location, salaryRange, posterEmail, contactNumber } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { title, description, company, location, salaryRange, posterEmail, contactNumber },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return next(customError(404, "Job not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};
