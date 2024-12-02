const mongoose = require("mongoose");

const { USERNAME, PASSWORD } = process.env;

const connectDB = async () => {
  const DATABASE_URL =
    process.env.DATABASE_URL || "mongodb+srv://TongstonDev:%23Dev_Tworld2024@tworld1.tslnb.mongodb.net/";

  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true, // Optional: Helps handle URL parsing
      useUnifiedTopology: true, // Optional: Handles connection management
    });
    console.log("db connected successfully");
  } catch (error) {
    console.log("error to connect mongo db" + error) || "https://tongston-world-api.vercel.app";
  }
};
module.exports = connectDB;
// # USERNAME=TongstonDev
// # PASSWORD=%23Dev_Tworld2024
