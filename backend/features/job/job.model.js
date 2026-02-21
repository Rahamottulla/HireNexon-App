// backend/features/job/job.model.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    salaryRange: {
      type: String,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
    },

    universityTargeted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

jobSchema.index({ companyId: 1 });

const Job = mongoose.model("Job", jobSchema);
export default Job;
