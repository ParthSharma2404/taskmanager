import React, { useState, useEffect, useContext, useCallback } from "react";
// import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Normal",
    category: "General",
    dueDate: "",
  });
  const [error, setError] = useState("");

  // ✅ Fetch tasks on mount
  useEffect(() => {
    if (user?.token) {
      fetchTasks();
    }
  }, [user]);


const fetchTasks = useCallback(async () => {
  if (!user?.token) return;
  try {
    const res = await API.get("/auth/tasks", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setTasks(res.data);
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
  }
}, [user]);

useEffect(() => {
  fetchTasks();
}, [fetchTasks]);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/tasks", newTask, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks([...tasks, res.data.task]);
      setNewTask({
        title: "",
        description: "",
        priority: "Normal",
        category: "General",
        dueDate: "",
      });
    } catch (err) {
      console.error("Failed to add task:", err);
      setError(err.response?.data?.error || "Could not create task");
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      const res = await API.patch(
        `/auth/tasks/${taskId}`,
        { completed },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks(tasks.map((t) => (t._id === taskId ? res.data.task : t)));
    } catch (err) {
      console.error("Failed to update task:", err);
      setError(err.response?.data?.error || "Could not update task");
    }
  };

  return (
    <div className="p-6 bg-[#0c0c0f] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.fullName}</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* ✅ Add Task Form */}
      <form onSubmit={addTask} className="mb-6 space-y-3">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task title"
          className="w-full p-2 bg-[#1a1a1e] border border-gray-700 rounded"
          required
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task description"
          className="w-full p-2 bg-[#1a1a1e] border border-gray-700 rounded"
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
          className="w-full p-2 bg-[#1a1a1e] border border-gray-700 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#7d40de] rounded hover:bg-[#6b35c2]"
        >
          Add Task
        </button>
      </form>

      {/* ✅ Task List */}
      <div>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one!</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center bg-[#1a1a1e] p-3 rounded"
              >
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                  <p className="text-xs text-gray-500">
                    Due: {task.dueDate?.split("T")[0] || "N/A"}
                  </p>
                </div>
                <button
                  onClick={() => toggleTaskCompletion(task._id, !task.completed)}
                  className={`px-3 py-1 rounded ${
                    task.completed
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {task.completed ? "Completed" : "Mark Complete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
