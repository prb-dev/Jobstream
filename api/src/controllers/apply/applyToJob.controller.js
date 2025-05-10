import { Apply } from "../../models/apply.model.js";
import { Job } from "../../models/job.model.js";
import { customError } from "../../utils/error.util.js";

export const applyToJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { resumeUrl, coverLetter } = req.body;
    const user = req.user;

    const job = await Job.findById(jobId);
    if (!job) return next(customError(404, "Job not found"));

    const application = await Apply.create({
      job: jobId,
      applicant: {
        applicantId: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      resumeUrl,
      coverLetter,
    });

    res.status(201).json({
      success: true,
      message: "Applied to job successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};
