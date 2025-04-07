const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`🚨 MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Event Listeners (Optional)
mongoose.connection.on("connected", () => console.log("✅ MongoDB Connection Established"));
mongoose.connection.on("error", (err) => console.error(`🚨 MongoDB Error: ${err.message}`));
mongoose.connection.on("disconnected", () => console.log("⚠️ MongoDB Disconnected"));

module.exports = connectDB;
