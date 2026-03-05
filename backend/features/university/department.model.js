import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    code: {
      type: String,
      default: null
    },

    totalStudents: {
      type: Number,
      default: 0
    },

    placementCoordinator: {
      name: String,
      email: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Department", departmentSchema);
