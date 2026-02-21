// backend/features/application/application.model.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true
    },

    resume: { type: String },
    coverLetter: { type: String },

    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected", "hired"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// 🚀 Prevent double apply
applicationSchema.index({ job: 1, student: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
