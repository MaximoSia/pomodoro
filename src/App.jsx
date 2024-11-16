import React, { useState } from "react";
import TaskList from "./components/TaskList/TaskList";
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (task) => setTasks([...tasks, task]);

  const handleEditTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <h1>Pomodoro App</h1>
      <PomodoroTimer task={selectedTask} />
      <TaskList
        tasks={tasks}
        onAdd={handleAddTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onSelect={setSelectedTask}
      />
    </div>
  );
};

export default App;
