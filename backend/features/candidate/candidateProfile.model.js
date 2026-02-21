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

    // Campus or Professional
    profileType: {
      type: String,
      enum: ["campus", "professional"],
      required: true
    },

    // Only required for campus students
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: function () {
        return this.profileType === "campus";
      }
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
