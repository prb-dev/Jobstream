import { customError } from "../utils/error.util.js";
import { logger } from "../utils/logger.util.js";

export const verifyUser = (req, res, next) => {
  if (req.params.id !== req.user.id) {
    const error = customError(401, "Unauthorized access");
    logger.error(
      `Token error. JWT user_id ${req.user.id} doesn't match params user_id ${req.params.id}: `,
      error
    );
    return next(error);
  }

  next();
};
