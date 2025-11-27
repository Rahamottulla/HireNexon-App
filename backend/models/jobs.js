// backend/models/jobs.js
import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    postedAt: { type: Date, default: Date.now },

    // Who posted the job (Organisation or Admin)
    createdBy: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      role: { type: String, enum: ["Organisation", "Admin"], required: true }
    }
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobsSchema); // ✅ fixed schema variable
export default Job; // ✅ export the correct variable
