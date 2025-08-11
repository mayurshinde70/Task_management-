const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req, res) => {
    try {
        const { fullName, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ fullName, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ msg: "User registered ✅" });
    } catch {
        res.status(500).json({ msg: "Server error" });
    }
};

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials ❌" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Invalid credentials ❌" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ token });
    } catch {
        res.status(500).json({ msg: "Login failed" });
    }
};

exports.getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        res.json(user);
    } catch {
        res.status(500).json({ msg: "Error fetching profile" });
    }
};

exports.updateProfile = async(req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.user, req.body, {
            new: true,
        }).select("-password");
        res.json({ msg: "Profile updated ✅", updated });
    } catch {
        res.status(500).json({ msg: "Profile update failed" });
    }
};