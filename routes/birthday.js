// routes/birthday.js
const express = require('express');
const User = require("../models/User.js"); // तुझा User model
const router = express.Router();

// आजपासून 15 दिवस पुढच्या birthday filter
router.get("/upcoming-birthdays", async(req, res) => {
    try {
        const users = await User.find({}, "name dob"); // फक्त नाव व dob घे

        const today = new Date();
        const upcoming = [];

        users.forEach(user => {
            if (!user.dob) return;

            const dob = new Date(user.dob);
            const thisYearBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

            // जर birthday आज झालेला असेल आणि पुढच्या वर्षात गेला असेल तर पुढच्या वर्षाचा consider कर
            if (thisYearBirthday < today) {
                thisYearBirthday.setFullYear(today.getFullYear() + 1);
            }

            const diffInDays = Math.ceil((thisYearBirthday - today) / (1000 * 60 * 60 * 24));

            if (diffInDays <= 15) {
                upcoming.push({
                    name: user.name,
                    dob: dob,
                    birthday: thisYearBirthday,
                    daysLeft: diffInDays
                });
            }
        });

        res.json(upcoming);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;