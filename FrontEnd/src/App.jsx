import { useState, useEffect } from "react";
import axios from "axios";
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
        "http://192.168.6.57:3000/api/ToDo/GetTasks"
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
          "http://192.168.6.57:3000/api/ToDo/AddTask",
          {
            title: input,
          }
        );

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
      await axios.delete(
        `http://192.168.6.57:3000/api/ToDo/DeleteTask/${taskID}`
      );
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
  async function handleMoveDown(taskID) {
try {
  const response = await axios.put(
    `http://192.168.6.57:3000/api/ToDo/MoveTaskDown/${taskID}`
  );

}
catch(error){
  console.log("ERORR");
}
  }
  async function handleMoveUp(taskID) {
    try {
       await axios.put(
         `http://192.168.6.57:3000/api/ToDo/MoveTaskUp/${taskID}`
       );

   
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with 500 status code
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from server:", error.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error setting up request:", error.message);
      }
      // Handle error appropriately
    }
  }

  return (
    <div className="app">
      <h1>To Do Tasks</h1>
      <div className="search">
        <input
          placeholder="Add a new task"
          value={input}
          id="input"
          onChange={handleInput}
          onKeyDown={handleAdd}
        ></input>
      </div>
      <div className="ToDoCard">
        {tasks.map((task) => (
          
          <li key={task._id}>
            <p>{task.title}</p>
            {<button onClick={() => handleDeleteTask(task._id)}>Delete</button>}
            {<button onClick={() => handleMoveUp(task._id)}>👆</button>}
            {<button onClick={() => handleMoveDown(task._id)}>👇</button>}
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
