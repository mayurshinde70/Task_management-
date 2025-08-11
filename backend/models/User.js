const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    mobile: String,
    dob: String,
    slackId: String,
    maritalStatus: String,
    address: String,
    about: String,
    profilePhoto: String, // base64 string
});

module.exports = mongoose.model("User", userSchema);