import mongoose from "mongoose";



const DbConnected = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Optional event listeners
    mongoose.connection.on("connected", () => {
      console.log("🔥 MongoDB connected successfully!");
    });

    mongoose.connection.on("error", (err) => {
      console.log("❌ MongoDB connection error:", err);
    });

    await mongoose.connect(process.env.MONGO_URI);

  } catch (error) {
    console.log("❌ Unable to connect to MongoDB!");
    console.error(error.message);
  }
};

export default DbConnected;
