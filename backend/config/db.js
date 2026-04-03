const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    console.log("----- MongoDB Debug Logs -----");

    // Check if env variable exists
    console.log("Checking MONGO_URI...");
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is NOT defined in .env");
      process.exit(1);
    }

    // Print partial URI for debugging
    console.log("MONGO_URI found");
    console.log("Connecting to MongoDB Atlas...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("✅ MongoDB Connected Successfully");
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

  } catch (error) {

    console.error("❌ MongoDB connection FAILED");
    console.error("Error Message:", error.message);
    console.error("Error Name:", error.name);
    console.error("Stack:", error.stack);

    process.exit(1);
  }
};

module.exports = connectDB;