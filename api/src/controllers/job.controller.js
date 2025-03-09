import { Job } from "../models/job.model.js";
import { customError } from "../utils/error.util.js";

// CREATE a new job
export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salaryRange,
      posterEmail,
      contactNumber,
    } = req.body;

    // Basic required field checks
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

// READ all jobs
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Jobs retrieved successfully",
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// READ one job by ID
export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return next(customError(404, "Job not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Job details retrieved successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE a job by ID
export const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      company,
      location,
      salaryRange,
      posterEmail,
      contactNumber,
    } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title,
        description,
        company,
        location,
        salaryRange,
        posterEmail,
        contactNumber,
      },
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

// DELETE a job by ID
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
