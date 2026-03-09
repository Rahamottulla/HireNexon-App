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
        "Private Limited",
        "Public Limited",
        "Startup",
        "MNC (Multinational)",
        "Partnership Firm",
        "Sole Proprietorship",
        "NGO / Non-Profit",
        "Government Body",
        "LLP (Limited Liability Partnership)",
        "Other",
      ],
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },
    
    headquarters: { type: String, required: true, default: null },
    companySize: { type: String, required: true, default: null },

    logo: { type: String, default: null },
    website: { type: String, default: null },
    emailDomain: { type: String, default: null },
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

export default mongoose.model("Company", companySchema);
