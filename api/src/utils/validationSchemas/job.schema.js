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
