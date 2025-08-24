// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     mobile: String,
//     dob: Date,
//     designation: String,
//     profilePhoto: String,
//     department: String,
//     gender: String,
//     slackId: String,
//     maritalStatus: String,
//     address: String,
//     about: String,
//     joiningDate: Date,
//     employeeId: String
// });
// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    mobile: String,
    dob: Date,
    designation: String,
    profilePhoto: String,
    department: String,
    gender: String,
    slackId: String,
    maritalStatus: String,
    address: String,
    about: String,
    joiningDate: { type: Date, default: Date.now }, // 👈 auto set hoil
    employeeId: String
});

module.exports = mongoose.model('User', userSchema);