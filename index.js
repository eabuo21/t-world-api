// Import necessary packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/connectDB");
const registration = require("./routers/Registration");

// Initialize the app
const app = express();
const { PORT } = process.env; // Port for the backend server

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173/", // Corrected: Remove trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"], // List allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

// Middleware setup
app.use(cors(corsOptions));
// app.use(cors({ origin: "*" })); // Allow cross-origin requests
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies from incoming requests

// Sample route to test the server
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

connectDB();

app.use("/register", registration);

// Route to handle the data from checkboxes
app.get("/api", (req, res) => {
  res.send("Hello from the backend!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
