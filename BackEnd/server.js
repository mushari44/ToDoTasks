const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());
// Middleware to parse JSON bodies (to use req.body)other wise it will give you undefined output
mongoose
  .connect("mongodb+srv://musharizh56:admin@cluster0.clvs4os.mongodb.net/ToDo")
  .then(() => {
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
app.get("/", (req, res) => {
  res.send("HE:L");
});
app.put("/api/ToDo/MoveTaskUp/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    // Fetch the task to move up
    const taskToMoveUp = await Task.findById(taskId);
    // Find the task immediately preceding the task to move up based on ObjectId
    const nextTask = await Task.findOne({
      _id: { $lt: taskToMoveUp._id },
    }).sort({ _id: -1 });

    // Swap the positions of the current task and the previous task
    const tempTitle = taskToMoveUp.title;
    taskToMoveUp.title = nextTask.title;
    nextTask.title = tempTitle;
    // Save both tasks back to the database
    // await Promise.all([taskToMoveUp.save(), nextTask.save()]);
    await nextTask.save();
    await taskToMoveUp.save();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error moving task up:", error);
    res.sendStatus(500);
  }
});
app.put("/api/ToDo/MoveTaskDown/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    // Fetch the task to move up
    const taskToMoveDown = await Task.findById(taskId);
    // Find the task immediately preceding the task to move up based on ObjectId
    const prevTask = await Task.findOne({
      _id: { $gt: taskToMoveDown._id },
    }); // Sort by ObjectId in descending order

    // Swap the positions of the current task and the previous task
    const tempTitle = taskToMoveDown.title;
    taskToMoveDown.title = prevTask.title;
    prevTask.title = tempTitle;
    // Save both tasks back to the database
    // await Promise.all([taskToMoveDown.save(), prevTask.save()]);
    await prevTask.save();
    await taskToMoveDown.save();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error moving task up:", error);
    res.sendStatus(500);
  }
});
const serverOptions = {
  key: fs.readFileSync("./private.key"),
  cert: fs.readFileSync("./certificate.crt"),
};

https.createServer(serverOptions, app).listen(3000, "192.168.6.57", () => {
  console.log("Server started on port 3000");
});
// app.listen(3000, "", () => {
//   console.log("SERVER started");
// });
