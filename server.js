const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];
let idCounter = 1;

// Create Task
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Valid title is required" });
  }

  const newTask = {
    id: idCounter++,
    title,
    description: description || "",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get All Tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get Task By ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// Update Task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description } = req.body;

  if (title && typeof title !== "string") {
    return res.status(400).json({ error: "Invalid title format" });
  }

  task.title = title || task.title;
  task.description = description || task.description;

  res.json(task);
});

// Delete Task (Refactored Version)
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json({ message: "Task deleted", task: deletedTask[0] });
});

module.exports = app;

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
