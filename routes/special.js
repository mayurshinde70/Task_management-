const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 24 तासातील new joinings (optional department/designation filters)
router.get('/new-joining', async(req, res) => {
    try {
        // 24 तासांपूर्वीचा वेळ
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // default criteria
        const criteria = {
            joiningDate: { $gte: twentyFourHoursAgo }
        };

        // जर query params मधून filter आले असतील तर criteria मध्ये add कर
        if (req.query.department) {
            criteria.department = req.query.department;
        }
        if (req.query.designation) {
            criteria.designation = req.query.designation;
        }
        if (req.query.name) {
            criteria.name = { $regex: req.query.name, $options: "i" }; // case-insensitive search
        }

        const newUsers = await User.find(criteria);
        res.json({
            count: newUsers.length,
            status: "new joining",
            users: newUsers
        });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;