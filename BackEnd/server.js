const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// Middleware to parse JSON bodies (to use req.body)other wise it will give you undefined output
// mongoose
//   .connect("mongodb+srv://musharizh56:admin@cluster0.clvs4os.mongodb.net/ToDo")
//   .then(() => {
//     console.log("connected to the data base");
//   });
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
let schema = new mongoose.Schema({ title: String });
const Task = mongoose.model("Task", schema);
// const firstTask = new Task({ title: "LETS GOOO" });
// firstTask.save().then(() => {
//   console.log("First Task added");
// });
app.get("/ToDo/GetTasks", (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks);
  });
});
app.post("/ToDo/AddTask", async (req, res) => {
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
app.delete("/ToDo/DeleteTask/:id", async (req, res) => {
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
  res.send("connected to the ToDo server");
});
app.put("/ToDo/MoveTaskUp/:id", async (req, res) => {
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
app.put("/ToDo/MoveTaskDown/:id", async (req, res) => {
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
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
