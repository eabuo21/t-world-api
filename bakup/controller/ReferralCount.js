const User = require("../model/user");
const getReferralCount = async (req, res) => {
  try {
    // Get user ID from session or token
    const { userId } = req.body;

    // Find the user in the database
    // const user = await User.findById(userId);
    // const referringUsers = await User.find({ referredBy: userId });
    const referringUsers = await User.find({ referredBy: userId });

    if (!referringUsers) {
      return res.status(404).json({ message: "referring not found" });
    }

    // Respond with the referral count
    res.status(200).json({
      message: "Referral count retrieved successfully",
      referralCount: referringUsers.length,
    });
  } catch (err) {
    console.error("Error fetching referral count:", err);
    res.status(500).json({
      message: "An error occurred while retrieving referral count",
      error: err.message,
    });
  }
};

module.exports = { getReferralCount };
