const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies (to use req.body)other wise it will give you undefined output

mongoose.connect("mongodb://127.0.0.1:27017/ToDo").then(() => {
  console.log("connected to the data base");
});
let schema = new mongoose.Schema({ title: String });
const Task = mongoose.model("Task", schema);
// const firstTask = new Task({ title: "LETS GOOO" });
// firstTask.save().then(() => {
//   console.log("First Task added");
// });
app.get("/api/ToDo/GetTasks", (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks);
  });
});
app.post("/api/ToDo/AddTask", async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save().then(() => {
      console.log("Task added " + newTask);
    });

    res.json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.delete("/api/ToDo/DeleteTask/:id", async (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("Task Deleted");
      res.sendStatus(200); // Sending a success status code
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      res.sendStatus(500); // Sending an error status code
    });
});

app.listen(3000, () => {
  console.log("SERVER started");
});
