import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "/search.svg";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  function handleInput(event) {
    setInput(event.target.value);
  }
  useEffect(() => {
   fetchTasks();
  }, [tasks]);
  async function fetchTasks() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/ToDo/GetTasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function handleAdd(event) {
    if (event.key === "Enter" && input !== "") {
      try {
        // Send a POST request to add the task with the title from the input field
        const response = await axios.post(
          "http://localhost:3000/api/ToDo/AddTask",
          {
            title: input,
          }
        )

        // Update the tasks state with the newly created task
        setTasks([...tasks, response.data]);
console.log("TAsk Added ");
        // Clear the input field
        setInput("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  }

  async function handleDeleteTask(taskID) {
    try {
      // Send a DELETE request to delete the task with the specified ID
      await axios.delete(`http://localhost:3000/api/ToDo/DeleteTask/${taskID}`);
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
  // function handleMoveDown(taskID) {}
  // function handleMoveUp(taskID) {}
  return (
    <div className="app">
      <h1>To Do Tasks</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={input}
          id="input"
          onChange={handleInput}
          onKeyDown={handleAdd}
        ></input>
        <img src={searchIcon} alt="search"></img>
      </div>
      <div className="ToDoCard">
        {tasks.map((task) => (
          <li key={task._id}>
            <p>{task.title}</p>
            {<button onClick={() => handleDeleteTask(task._id)}>Delete</button>}
            {/* {<button onClick={() => handleMoveUp(task._id)}>👆</button>} */}
            {/* {<button onClick={() => handleMoveDown(task._id)}>👇</button>} */}
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
