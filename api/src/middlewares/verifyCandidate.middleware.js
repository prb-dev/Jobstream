import { customError } from "../utils/error.util.js";
import { logger } from "../utils/logger.util.js";

export const verifyCandidate = (req, res, next) => {
  if (req.user.role !== "candidate") {
    const error = customError(403, "Action is forbidden");
    logger.error(
      `Token error. User ${req.user.id} is not a candidate: `,
      error
    );
    return next(error);
  }

  next();
};
