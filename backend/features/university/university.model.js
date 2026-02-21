// backend/features/university/university.model.js
import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    universityName: { type: String, required: true },
    location: { type: String },
    contactEmail: { type: String },
    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("University", universitySchema);
