import { Apply } from "../../models/apply.model.js";
import { customError } from "../../utils/error.util.js";

export const updateApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { resumeUrl, coverLetter } = req.body;

    const updatedApplication = await Apply.findByIdAndUpdate(
      applicationId,
      { resumeUrl, coverLetter },
      { new: true }
    );

    if (!updatedApplication)
      return next(customError(404, "Application not found"));

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    next(error);
  }
};
