const express = require("express");
const registration = express.Router();
const { Signup } = require("../controller/Resgistration");
const { getReferralCount } = require("../controller/ReferralCount");

registration.post("/signup", Signup);
registration.post("/referral", getReferralCount);

module.exports = registration;
