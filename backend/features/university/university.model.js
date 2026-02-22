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
        "Government",
        "Private",
        "Deemed",
        "Autonomous",
        "International",
      ],
      required: true,
    },
    
    location: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      default: null,
    },

    website: {
      type: String,
      default: null,
    },

    logo: {
      type: String,
      default: null,
    },

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
