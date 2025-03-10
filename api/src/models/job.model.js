import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    company: {
      name: {
        type: String,
        required: [true, "Company name is required"],
      },
      location: {
        type: String,
        default: "Remote",
      },
    },
    mode: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      default: "remote",
    },
    employer: {
      employerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref: "User",
      },
      phoneNumber: {
        type: String,
        required: [true, "Employer phone number is required"],
        validate: {
          validator: function (value) {
            return /^(?:\+94|0)?7\d{8}$/.test(value);
          },
          message: "Invalid Sri Lankan mobile number format",
        },
      },
      employerEmail: {
        type: String,
        required: [true, "Employer email is required"],
        match: [/.+@.+\..+/, "Invalid email format"],
      },
    },
    salaryRange: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 0,
      },
    },
    jobType: {
      type: String,
      enum: ["full-time", "internship", "contract"],
      default: "full-time",
    },
    keywords: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
