import { Job } from "../models/job.model.js";
import { customError } from "../utils/error.util.js";

export const createJob = async (req, res, next) => {
  try {
    const { title, description, company, location, salaryRange, posterEmail, contactNumber } = req.body;

    if (!title || !description || !company || !posterEmail || !contactNumber) {
      return next(
        customError(
          400,
          "Missing required fields. Please provide title, description, company, poster email, and contact number."
        )
      );
    }

    const newJob = await Job.create({
      title,
      description,
      company,
      location,
      salaryRange,
      posterEmail,
      contactNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJob,
    });
  } catch (error) {
    next(error);
  }
};
