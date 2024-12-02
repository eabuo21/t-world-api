const mongoose = require("mongoose");

const { USERNAME, PASSWORD } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(
      // `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.zgp9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      `mongodb+srv://tongston:${PASSWORD}@cluster0.zgp9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("db connected successfully");
  } catch (error) {
    console.log("error to connect mongo db" + error);
  }
};
module.exports = connectDB;
