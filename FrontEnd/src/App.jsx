import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  async function fetchTasks() {
    try {
      const response = await axios.get(
        "https://todotasks.onrender.com/ToDo/GetTasks"
      );

      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // setError("Loading Tasks");
    }

  }

  async function handleAddTask(event) {
    if (event.key === "Enter" && input.trim() !== "") {
      try {
        await axios.post("https://todotasks.onrender.com/ToDo/AddTask", {
          title: input.trim(),
        });
        // fetchTasks();
        setInput("");
        setError(null);
      } catch (error) {
        console.error("Error adding task:", error);
        setError("Loading Tasks");
      }
    }
  }

  async function handleDeleteTask(taskID) {
    try {
      await axios.delete(
        `https://todotasks.onrender.com/ToDo/DeleteTask/${taskID}`
      );
      // fetchTasks();
      setError(null);
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Loading Tasks");
    }
  }

  async function handleMoveUp(taskID) {
    try {
      await axios.put(
        `https://todotasks.onrender.com/ToDo/MoveTaskUp/${taskID}`
      );
      // fetchTasks();
      setError(null);
    } catch (error) {
      console.error("Error moving task up:", error);
      setError("Loading Tasks");
    }
  }

  async function handleMoveDown(taskID) {
    try {
      await axios.put(
        `https://todotasks.onrender.com/ToDo/MoveTaskDown/${taskID}`
      );
      // fetchTasks();
      setError(null);
    } catch (error) {
      console.error("Error moving task down:", error);
      setError("Loading Tasks");
    }
  }

  return (
    <div className="app">
      <a href="https://mushari44.github.io/ApiSearchMovie/" target="_blank">
        Movie Land
      </a>
      <h1>To Do Tasks</h1>
      <div className="search">
        <input
          placeholder="Add a new task"
          value={input}
          id="input"
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleAddTask}
        />
      </div>
      {error ? (
        <p className="loading">Error: {error}</p>
      ) : (
        <ul className="ToDoCard">
          {tasks.map((task) => (
            <li key={task._id}>
              <p>{task.title}</p>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              <button onClick={() => handleMoveUp(task._id)}>👆</button>
              <button onClick={() => handleMoveDown(task._id)}>👇</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
