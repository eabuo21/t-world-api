const mongoose = require("mongoose");
const generateReferralCode = require("../config/generateReferralCode");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    userType: {
      type: String,
      enum: ["Entrepreneur", "Professional", "Higher Education Student"],
      required: true,
    },
    industry: {
      type: String,
      required: function () {
        return this.userType !== "Higher Education Student";
      },
    },
    sector: {
      type: String,
      required: function () {
        return this.userType === "Higher Education Student";
      },
    },
    highEducationValue: {
      type: String,
      enum: ["Securing a job", "Starting/scaling your business"],
      required: function () {
        return this.userType === "Higher Education Student";
      },
    },
    features: { type: [String], default: [] },
    referralCode: { type: String, unique: true }, // Store the referral code
    referredBy: { type: String, default: null }, // Store the referral code of the referrer
    referralCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  try {
    if (!this.referralCode) {
      this.referralCode = generateReferralCode();
    }
    next();
  } catch (error) {
    next(error); // Pass the error to Mongoose's error handling
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
