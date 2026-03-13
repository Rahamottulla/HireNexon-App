// backend/features/workspace/workspaceMember.model.js
import mongoose from "mongoose";

const workspaceMemberSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },
    workspaceType: {
      type:     String,
      enum:     ["company", "university", "personal"],
      required: true,
    },
    workspaceId: {
      type:     mongoose.Schema.Types.ObjectId,
      required: true,
      refPath:  "workspaceModel",
    },
    workspaceModel: {
      type:   String,
      enum:   ["Company", "University"],
      required: true,
    },
    role: {
      type:    String,
      enum:    ["owner", "admin", "member"],
      default: "owner",
    },
  },
  { timestamps: true }
);

// One user can only be in a workspace once
workspaceMemberSchema.index(
  { userId: 1, workspaceId: 1 },
  { unique: true }
);

export default mongoose.model("WorkspaceMember", workspaceMemberSchema);
