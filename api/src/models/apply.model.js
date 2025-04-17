import mongoose from "mongoose";

const applySchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref: "User"
      },
      name: {
        type: String,
        required: [true, "Applicant name is required"],
      },
      email: {
        type: String,
        required: [true, "Applicant email is required"],
        match: [/.+@.+\..+/, "Invalid email format"],
      },
      phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
      },
    },
    resumeUrl: {
      type: String,
      required: [true, "Resume URL is required"],
    },
    coverLetter: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Apply = mongoose.model("Apply", applySchema);
