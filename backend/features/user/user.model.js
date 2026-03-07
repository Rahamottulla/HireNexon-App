// backend/features/user/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  { 
    fullName: {
    type: String,
    required: true,
    trim: true
    },
    
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },

    password: { type: String, required: true, minlength: 8, select: false  },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    isVerified: { type: Boolean, default: false },
    
    lastVerificationSentAt: {type: Date },

  },
  { timestamps: true }
);

// Index for faster filtering
UserSchema.index({ role: 1 });

// Hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

UserSchema.virtual("profile", {
  ref: "CandidateProfile",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

// Hide password
UserSchema.methods.toJSON = function () {
  const obj = this.toObject({ virtuals: true });
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
