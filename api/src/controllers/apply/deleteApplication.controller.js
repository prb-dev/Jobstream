import { Apply } from "../../models/apply.model.js";
import { customError } from "../../utils/error.util.js";

export const deleteApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;

    const deleted = await Apply.findByIdAndDelete(applicationId);
    if (!deleted) return next(customError(404, "Application not found"));

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
