import { customError } from "../utils/error.util.js";
import { logger } from "../utils/logger.util.js";

export const verifyEmployer = (req, res, next) => {
  if (req.user.role !== "employer") {
    const error = customError(403, "Action is forbidden");
    logger.error(
      `Token error. User ${req.user.id} is not an employer: `,
      error
    );
    return next(error);
  }

  next();
};
