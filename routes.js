const express = require("express");
const router = express.Router();

let tasks = [];
let taskId = 1;

// Get all tasks
router.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
router.post("/tasks", (req, res) => {
  const { title } = req.body;
  const newTask = { id: taskId++, title, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});

// Update a task (mark as completed)
router.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = tasks.find((t) => t.id === parseInt(id));
  
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = completed;
  res.json({ message: "Task updated", task });
});

// Delete a task
router.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.json({ message: "Task deleted" });
});

module.exports = router;
