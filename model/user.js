const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: false, unique: false },
  phone: { type: String, required: true },
  country: { type: String },
  userType: { type: String },
  industry: { type: String },
  sector: { type: String },
  highEducationValue: { type: String },
  features: { type: [String], default: [] },
  achievementFeatures: { type: [String], default: [] },
  referralCode: {
    type: String,
    unique: false, // Make sure this is false to prevent uniqueness constraint
    required: false,
    default: "0", // Default value for users without a referral code
  },
  referredBy: { type: String, required: false }, // Store the referral code as a string
  referralCount: { type: Number, default: 0 }, // Track the number of referrals
});

module.exports = mongoose.model("User", userSchema, "Signup");
