// backend/features/application/application.model.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },

    resume: { type: String },
    coverLetter: { type: String },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewed",
        "shortlisted",
        "interview",
        "rejected",
        "hired"
      ],
      default: "pending"
    },

    interviewDate: {
      type: Date,
    },

    interviewMode: {
      type: String,
      enum: ["online", "offline"],
    }
  },
  { timestamps: true }
);

// Prevent double apply
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
