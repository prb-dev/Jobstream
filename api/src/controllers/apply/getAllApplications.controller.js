import { Apply } from "../../models/apply.model.js";

export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await Apply.find().populate("job");

    res.status(200).json({
      success: true,
      message: "All applications retrieved",
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};
