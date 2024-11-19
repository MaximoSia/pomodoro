import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm/TaskForm";
import "./TaskList.css";

const TaskList = ({ onAdd, onEdit, onDelete, onSelect }) => {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (task) => {
    setTasks([...tasks, task]);
    onAdd(task);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    onDelete(taskId);
  };

  return (
    <div className="taskList">
      <h2>Tareas</h2>
      <TaskForm onSubmit={handleAdd} />
      <ul className="listTask">
        {tasks.map((task) => (
          <li key={task.id} className="taskItem" onClick={() => onSelect(task)}>
            <span>{task.name}</span>
            <button onClick={() => handleDelete(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;