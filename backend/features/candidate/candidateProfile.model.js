//backend/features/candidate/candidateProfile.model.js
import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    branch: { type: String },
    graduationYear: { type: Number },

    skills: [{ type: String }],

    resumeUrl: { type: String },

    // Employment info (for professionals or working students)
    currentEmployment: {
      isEmployed: { type: Boolean, default: false },
      companyName: { type: String },
      jobTitle: { type: String },
      experienceYears: { type: Number }
    },

    seekingOpportunities: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("CandidateProfile", candidateProfileSchema);
