import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌");
    process.exit(1);
  }
};

export default connectDB;
