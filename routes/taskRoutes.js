const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getUsers
} = require("../controllers/taskController");

// Task CRUD
router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

// AssignedTo dropdown
router.get("/list", auth, getUsers);
router.get("/users", auth, getUsers);

// ✅ Add Task (for testing)
// router.post("/", async(req, res) => {
//     try {
//         const { title, status } = req.body;
//         const newTask = new Task({ title, status });
//         await newTask.save();
//         res.json(newTask);
//     } catch (err) {
//         res.status(500).json({ error: "Server error" });
//     }
// });
// router.get("/:userId", async(req, res) => {
//     try {
//         const { title } = req.params;
//         const tasks = await Task.find({ title: title, owner: req.params.userId });
//         res.json(tasks);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching tasks" });
//     }
// });

module.exports = router;