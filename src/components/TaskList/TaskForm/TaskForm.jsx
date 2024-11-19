import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onSubmit({ id: Date.now(), name: taskName });
      setTaskName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="taskForm">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default TaskForm;
