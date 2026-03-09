// backend/features/university/university.model.js
import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    universityType: {
      type: String,
      enum: [
        "Autonomous Institute (IIT/NIT/IIIT)",
        "Institute of National Importance",
        "Private University",
        "Central University",
        "State University",
        "Deemed University",
        "Affiliated College",
        "Open University",
        "International University",
        "Other",
      ],
      required: true,
    },

    location: { type: String, required: true },
    website: { type: String, default: null },
    emailDomain: { type: String, default: null },
    logo: { type: String, default: null },
    placementOfficer: { type: String, default: null },
    departments: [{ type: String }],
    description: { type: String, default: null },

    isVerified: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("University", universitySchema);
