import { Apply } from "../../models/apply.model.js";
import { customError } from "../../utils/error.util.js";

export const getSingleApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;

    const application = await Apply.findById(applicationId).populate("job");
    if (!application) return next(customError(404, "Application not found"));

    res.status(200).json({
      success: true,
      message: "Application details retrieved",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};
