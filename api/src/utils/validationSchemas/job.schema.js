import Joi from "joi";

export const filterJobsSchema = Joi.object({
  search: Joi.string().trim(),
  mode: Joi.string().valid("remote", "onsite", "hybrid"),
  jobType: Joi.string().valid("full-time", "internship", "contract"),
  location: Joi.string().trim(),
  minSalary: Joi.number().min(0),
  maxSalary: Joi.number().min(0),
  sortBy: Joi.string().valid("date", "salary").default("date"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
});

export const getJobSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": "Job id must be a valid ObjectId",
    }),
});
