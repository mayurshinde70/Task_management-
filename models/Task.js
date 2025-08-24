const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, minlength: 3 },
    category: String,
    project: String,
    startDate: Date,
    dueDate: Date,
    noDueDate: { type: Boolean, default: false },
    status: { type: String, enum: ["Incomplete", "In Progress", "Completed"], default: "Incomplete" },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array     label: String,
    milestone: String,
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    private: { type: Boolean, default: false },
    billable: { type: Boolean, default: false },
    timeEstimate: String,
    repeat: { type: Boolean, default: false },
    dependent: { type: Boolean, default: false },
    file: String, // file path / URL
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);