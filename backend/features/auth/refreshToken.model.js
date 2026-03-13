// backend/features/auth/refreshToken.model.js
import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  userId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      "User",
    required: true,
  },
  token: {
    type:     String,
    required: true,
    unique:   true,
  },
  expiresAt: {
    type:     Date,
    required: true,
  },
  device: {
    userAgent: { type: String, default: "unknown" },
    ip:        { type: String, default: "unknown" },
    lastUsed:  { type: Date,   default: Date.now  },
  },
}, { timestamps: true });

// Auto-delete expired tokens from DB
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("RefreshToken", RefreshTokenSchema);
