// routes/birthday.js
const express = require('express');
const User = require("../models/User.js");
const router = express.Router();

// All users list (only names)
router.get("/alluser", async(req, res) => {
    try {
        const users = await User.find({}, "name"); // फक्त नाव घे

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        const usersWithName = users.filter(user => user.name && user.name.trim() !== "");
        return res.json(usersWithName); // ✅ फक्त एकदाच response पाठव
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;