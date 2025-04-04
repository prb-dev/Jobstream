import { Job } from "../../models/job.model.js";
import { logger } from "../../utils/logger.util.js";
import { validateFilterJobs } from "../../utils/validator.util.js";

export const filterJobs = async (req, res, next) => {
  const { error, value } = validateFilterJobs(req.query);

  if (error) return next(error);

  const {
    search,
    mode,
    jobType,
    location,
    minSalary,
    maxSalary,
    sortBy,
    sortOrder,
    page,
    limit,
  } = value;

  const skip = (page - 1) * limit;
  const sortByField = sortBy === "salary" ? "salaryRange.min" : "createdAt";

  const pipeline = [];

  if (search)
    pipeline.push({
      $search: {
        index: "default",
        text: {
          query: search,
          path: ["title", "keywords", "description"],
          fuzzy: {
            maxEdits: 2,
            prefixLength: 0,
            maxExpansions: 50,
          },
        },
      },
    });

  pipeline.push({
    $match: {
      ...(mode && { mode }),
      ...(jobType && { jobType }),
      ...(location && { "company.location": location }),
      ...(minSalary && { "salaryRange.min": { $gte: minSalary } }),
      ...(maxSalary && { "salaryRange.max": { $lte: maxSalary } }),
    },
  });

  pipeline.push({
    $facet: {
      jobs: [
        {
          $sort: {
            [sortByField]: sortOrder === "asc" ? 1 : -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ],
      count: [
        {
          $count: "totalCount",
        },
      ],
    },
  });

  pipeline.push({
    $project: {
      jobs: 1,
      paginationInfo: {
        totalCount: {
          $ifNull: [
            {
              $first: "$count.totalCount",
            },
            0,
          ],
        },
        totalPages: {
          $ifNull: [
            {
              $ceil: {
                $divide: [
                  {
                    $first: "$count.totalCount",
                  },
                  limit,
                ],
              },
            },
            0,
          ],
        },
      },
    },
  });

  try {
    const [{ jobs, paginationInfo }] = await Job.aggregate(pipeline);

    logger.info("Jobs fetched successfully.");
    res.status(200).json({ jobs, paginationInfo });
  } catch (error) {
    logger.error("Error fetching jobs: ", error);
    next(error);
  }
};
