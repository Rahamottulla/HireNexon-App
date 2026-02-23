// backend/features/user/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    isVerified: { type: Boolean, default: false },
    
    lastVerificationSentAt: {type: Date },

    password: { type: String, required: true, minlength: 6, select: false  },

    role: {
      type: String,
      enum: ["student", "company", "university", "admin"],
      default: "student"
    },

    studentType: {
     type: String,
     enum: ["campus", "professional"],
     default: "professional",
    },

    isCampusVerified: {
     type: Boolean,
     default: false,
    },

    campusVerificationStatus: {
     type: String,
     enum: ["none", "pending", "approved", "rejected"],
     default: "none",
    },

    universityId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "University",
     default: null,
    },

    organizationId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Organization",
     default: null,
    },

  },
  { timestamps: true }
);

// Index for faster filtering
UserSchema.index({ role: 1 });
UserSchema.index({ username: 1 });


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

// Hide password
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
