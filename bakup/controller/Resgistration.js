const User = require("../model/user");
const Signup = async (req, res) => {
  // Controller for signing up a user
  try {
    // Extract data from the request body
    const {
      firstName,
      email,
      phone,
      country,
      userType,
      industry,
      sector,
      highEducationValue,
      features,
      referredBy,
    } = req.body;

    // Validate required fields manually if needed
    if (!firstName || !email || !phone || !country || !userType) {
      return res.status(400).json({ message: "Required fields are missing!" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { firstName }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email or username already exists." });
    }

    console.log("refferd by", referredBy);
    // Create a new user instance
    const newUser = new User({
      firstName,
      email,
      phone,
      country,
      userType,
      industry: userType !== "Higher Education Student" ? industry : undefined,
      sector: userType === "Higher Education Student" ? sector : undefined,
      highEducationValue:
        userType === "Higher Education Student"
          ? highEducationValue
          : undefined,
      features,
      referredBy: referredBy,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    if (referredBy) {
      const referringUser = await User.findOne({ referralCode: referredBy });
      console.log("Searching for referral code:", referredBy);
      if (referringUser) {
        referringUser.referralCount += 1;
        await referringUser.save();
      } else {
        console.error("No user found with the referral code:", referredBy);
      }
    }

    // Respond with success message and saved user data
    res.status(201).json({
      message: "User signed up successfully!",
      user: savedUser,
      userId: savedUser._id,
      referral: {
        referralCode: newUser.referralCode,
        referredBy: newUser.referredBy,
        referralCount: newUser.referralCount,
      },
    });
  } catch (err) {
    console.error("Error in signupController:", err);
    res.status(500).json({
      message: "An error occurred during signup.",
      error: err.message,
    });
  }
};

const demo = async (req, res) => {
  return res.status(400).json({ message: "demo" });
};

module.exports = { Signup, demo };
