const User = require("../model/user");

const Signup = async (req, res) => {
  try {
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
      referredBy, // Referral code from URL or user input
      acheivermentsCheckbox,
    } = req.body;

    // Initialize referredByUser to null
    let referredByUser = null;

    // Step 1: Handle referredBy (optional)
    if (referredBy) {
      // Look for the referrer user in the database using the referral code
      referredByUser = await User.findOne({
        referralCode: referredBy,
      }).maxTimeMS(10000); // 10 seconds timeout

      // If the referrer is not found, return an error
      if (!referredByUser) {
        return res.status(400).json({ message: "Invalid referral code." });
      }
    }

    // Step 2: Generate a referral code only if no `referredBy` is provided
    let referralCode = "0"; // Default referralCode to '0'
    if (!referredBy) {
      // If no referral code is given, generate a new unique referral code for the user
      referralCode = await generateUniqueReferralCode(); // Use unique referral code generation function
    }

    // Step 3: Create the new user
    const newUser = new User({
      firstName,
      email,
      phone,
      country,
      userType,
      industry,
      sector,
      highEducationValue,
      features: features || [], // Default to empty array if no features are provided
      referredBy: referredByUser ? referredByUser._id : null, // Store the referrer's ObjectId if valid, else null
      referralCode: referralCode, // Assign the referral code if it was generated
      achievementFeatures: acheivermentsCheckbox,
    });

    // Step 4: Save the new user to the database
    const savedUser = await newUser.save();

    // Step 5: Update the referrer's referral count (if referredByUser exists)
    if (referredByUser) {
      referredByUser.referralCount += 1; // Increment referral count
      await referredByUser.save(); // Save the updated referrer
    }

    // Step 6: Return the response with user and referral details
    res.status(201).json({
      message: "User created successfully",
      userId: savedUser._id,
      referral: {
        referralCode: savedUser.referralCode,
        referralCount: referredByUser ? referredByUser.referralCount : 0, // Return referrer referral count if they exist
      },
    });
  } catch (error) {
    console.error("Error in signupController:", error);
    res.status(400).json({ message: error.message });
  }
};

// A function to generate a unique referral code
async function generateUniqueReferralCode() {
  let referralCode;
  let isUnique = false;

  // Loop until a unique referral code is generated
  while (!isUnique) {
    referralCode = Math.random().toString(36).substring(2, 10); // Generates a random string of 8 characters
    const existingUser = await User.findOne({ referralCode });

    if (!existingUser) {
      isUnique = true; // Stop if the referral code is unique
    }
  }

  return referralCode;
}

module.exports = { Signup };
