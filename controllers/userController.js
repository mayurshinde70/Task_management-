const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async(req, res) => {
    const { name, email, password } = req.body;

    // Generate next EmployeeId
    const lastUser = await User.findOne().sort({ _id: -1 });
    let nextId = "EMP1001";
    if (lastUser && lastUser.employeeId) {
        const num = parseInt(lastUser.employeeId.replace("EMP", ""));
        nextId = "EMP" + (isNaN(num) ? 1001 : num + 1);
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashed,
        employeeId: nextId
    });

    res.status(201).json({ message: "Account created" });
};



exports.login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { name: user.name, email: user.email } });
};

exports.getProfile = async(req, res) => {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);

};

exports.updateProfile = async(req, res) => {
    const updates = {...req.body };
    if (updates.password) { // If user wants to change password
        updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true, select: '-password' });
    if (!user) return res.status(404).json({ error: "Update failed" });
    res.json(user);

};