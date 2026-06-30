import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

function App() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const loadTasks = async () => {
        const res = await axios.get(API);
        setTasks(res.data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const addTask = async () => {

        if (!title.trim()) return;

        await axios.post(API, { title });

        setTitle("");

        loadTasks();

    };

    const completeTask = async (id) => {

        await axios.put(`${API}/${id}`);

        loadTasks();

    };

    const deleteTask = async (id) => {

        await axios.delete(`${API}/${id}`);

        loadTasks();

    };

    return (

        <div className="container">

            <h1>Task Manager</h1>

            <div className="inputBox">

                <input
                    type="text"
                    placeholder="Enter task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button onClick={addTask}>
                    Add Task
                </button>

            </div>

            <div className="tasks">

                {tasks.map(task => (

                    <div className="card" key={task.id}>

                        <h3>{task.title}</h3>

                        <p>Status : {task.status}</p>

                        <div className="buttons">

                            <button
                                className="complete"
                                onClick={() => completeTask(task.id)}
                            >
                                Complete
                            </button>

                            <button
                                className="delete"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default App;