// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Loaded MONGO_URI =", process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit app if connection fails
  }
};

export default connectDB;


