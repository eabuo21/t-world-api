const crypto = require("crypto");

const generateReferralCode = () => {
  return crypto.randomBytes(4).toString("hex").toUpperCase(); // Generates an 8-character code
};

module.exports = generateReferralCode;
