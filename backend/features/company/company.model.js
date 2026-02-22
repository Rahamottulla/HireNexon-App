// backend/features/company/company.model.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    organizationType: {
      type: String,
      enum: [
        "Startup",
        "Pvt. Ltd.",
        "Public Limited",
        "Government",
        "MNC",
        "NGO",
      ],
      required: true,
    },

    industry: {
      type: String,
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

export default mongoose.model("Company", companySchema);
