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
      type: String,
      required: [true, "Company name is required"],
    },
    location: {
      type: String,
      default: "Remote",
    },
    salaryRange: {
      type: String,
      default: "Not specified",
    },
    posterEmail: {
      type: String,
      required: [true, "Poster email is required"],
      match: [/.+@.+\..+/, "Invalid email format"]
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      validate: {
        validator: function (value) {
          return /^(?:\+94|0)?7\d{8}$/.test(value);
        },
        message: "Invalid Sri Lankan mobile number format",
      },
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
