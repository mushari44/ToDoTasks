// import { useState, useEffect } from "react";
// import axios from "axios";

// export function App() {
//   const [tasks, setTasks] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   async function fetchTasks() {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "https://todotasks.onrender.com/ToDo/GetTasks"
//       );
//       setTasks(response.data);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       setError("Failed to fetch tasks. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleAddTask(event) {
//     if (event.key === "Enter" && input.trim() !== "") {
//       try {
//         const response = await axios.post(
//           "https://todotasks.onrender.com/ToDo/AddTask",
//           {
//             title: input.trim(),
//           }
//         );
//         fetchTasks();
//         setInput("");
//         setError(null);
//       } catch (error) {
//         console.error("Error adding task:", error);
//         setError("Failed to add task. Please try again later.");
//       }
//     }
//   }

//   async function handleDeleteTask(taskID) {
//     try {
//       await axios.delete(
//         `https://todotasks.onrender.com/ToDo/DeleteTask/${taskID}`
//       );
//       fetchTasks();
//       setError(null);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//       setError("Failed to delete task. Please try again later.");
//     }
//   }

//   async function handleMoveUp(taskID) {
//     try {
//       await axios.put(
//         `https://todotasks.onrender.com/ToDo/MoveTaskUp/${taskID}`
//       );
//       // const index = tasks.findIndex((task) => task._id === taskID);
//       // if (index > 0) {
//       //   const updatedTasks = [...tasks];
//       //   [updatedTasks[index], updatedTasks[index - 1]] = [
//       //     updatedTasks[index - 1],
//       //     updatedTasks[index],
//       //   ];
//       //   setTasks(updatedTasks);
//       // }
//       fetchTasks();
//       setError(null);
//     } catch (error) {
//       console.error("Error moving task up:", error);
//       setError("Failed to move task up. Please try again later.");
//     }
//   }

//   async function handleMoveDown(taskID) {
//     try {
//       await axios.put(
//         `https://todotasks.onrender.com/ToDo/MoveTaskDown/${taskID}`
//       );
//       const index = tasks.findIndex((task) => task._id === taskID);
//       if (index < tasks.length - 1) {
//         const updatedTasks = [...tasks];
//         [updatedTasks[index], updatedTasks[index + 1]] = [
//           updatedTasks[index + 1],
//           updatedTasks[index],
//         ];
//         // setTasks(updatedTasks);
//       }
//       fetchTasks();
//       setError(null);
//     } catch (error) {
//       console.error("Error moving task down:", error);
//       setError("Failed to move task down. Please try again later.");
//     }
//   }

//   return (
//     <div className="app">
//       <a href="https://mushari44.github.io/ApiSearchMovie/" target="_blank">
//         Movie Land
//       </a>
//       <h1>To Do Tasks</h1>
//       <div className="search">
//         <input
//           placeholder="Add a new task"
//           value={input}
//           id="input"
//           onChange={(event) => setInput(event.target.value)}
//           onKeyDown={handleAddTask}
//         />
//       </div>
//       {loading ? (
//         <p className="loading">Loading tasks...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <ul className="ToDoCard">
//           {tasks.map((task) => (
//             <li key={task._id}>
//               <p>{task.title}</p>
//               <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
//               <button onClick={() => handleMoveUp(task._id)}>👆</button>
//               <button onClick={() => handleMoveDown(task._id)}>👇</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
