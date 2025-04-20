import {
  filterJobsSchema,
  getJobSchema,
} from "./validationSchemas/job.schema.js";

const validate = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

export const validateFilterJobs = validate(filterJobsSchema);
export const validateGetJob = validate(getJobSchema);
