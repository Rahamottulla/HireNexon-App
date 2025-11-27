// resetPassword.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Candidate from "./models/Candidates.js"; // make sure path is correct

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const emailToUpdate = "rahamottullam@gmail.com"; // candidate email
const newPassword = "Jeet@36"; // plain password

const resetPassword = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await Candidate.updateOne(
      { email: emailToUpdate },
      { $set: { password: hashedPassword } }
    );

    console.log("Update result:", result);
    console.log("✅ Password updated successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error updating password:", error);
  }
};

resetPassword();
