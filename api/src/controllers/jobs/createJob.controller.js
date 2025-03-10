import { Job } from "../../models/job.model.js";
import { customError } from "../../utils/error.util.js";

export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      company,
      mode,
      employer,
      salaryRange,
      jobType,
      keywords,
    } = req.body;

    if (
      !title ||
      !description ||
      !company?.name ||
      !employer?.phoneNumber ||
      !employer?.employerEmail
    ) {
      return next(
        customError(
          400,
          "Missing required fields. Please provide title, description, company.name, employer.phoneNumber, and employer.employerEmail."
        )
      );
    }

    const newJob = await Job.create({
      title,
      description,
      company,
      mode,
      employer: {
        employerId: req.user.id,
        phoneNumber: employer.phoneNumber,
        employerEmail: employer.employerEmail,
      },
      salaryRange,
      jobType,
      keywords,
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
