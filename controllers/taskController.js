const Task = require('../models/Task');
const User = require('../models/User');

// Create Task
exports.createTask = async(req, res) => {
    try {
        const taskData = {
            ...req.body,
            owner: req.userId // from JWT middleware
        };
        const users = await User.find({}, 'name');

        res.json(users);
        console.log(users);
        const task = await Task.create(taskData);

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Task creation failed', details: err.message });
    }
};

// Get All Tasks for Logged-in User
exports.getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({ owner: req.userId }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Fetching tasks failed' });
    }
};

// Update Task
exports.updateTask = async(req, res) => {
    try {
        const updated = await Task.findOneAndUpdate({ _id: req.params.id, owner: req.userId },
            req.body, { new: true }
        );
        if (!updated) return res.status(404).json({ error: 'Task not found or unauthorized' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Task update failed' });
    }
};

// Delete Task
exports.deleteTask = async(req, res) => {
    try {
        const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId });
        if (!deleted) return res.status(404).json({ error: 'Task not found or unauthorized' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Task deletion failed' });
    }
};


// Get All Tasks (shows assignedTo names)
exports.getUsers = async(req, res) => {
    try {
        const users = await User.find({}, "name ");
        res.send(users);
        console.log(users);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err); // log in terminal
        res.status(500).json({ error: "Failed to fetch users", details: err.message });
    }
};