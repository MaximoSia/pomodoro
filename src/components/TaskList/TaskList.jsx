import React from "react";
import TaskForm from "../TaskForm/TaskForm";
import "./TaskList.css";

const TaskList = ({ tasks, onAdd, onEdit, onDelete, onSelect }) => (
  <div className="taskList">
    <h2>Tareas</h2>
    <TaskForm onSubmit={onAdd} />
    <ul className="listTask">
      {tasks.map((task) => (
        <li key={task.id} className="taskItem" onClick={() => onSelect(task)}>
          <span>{task.name}</span>
          <button onClick={() => onDelete(task.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskList;
