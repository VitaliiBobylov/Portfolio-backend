import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error);
    process.exit(1);
  }
};
