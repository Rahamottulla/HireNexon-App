// backend/features/company/company.model.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    companyName: { type: String, required: true },
    type: { type: String, enum: ["private", "government"], required: true },
    location: { type: String },
    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
