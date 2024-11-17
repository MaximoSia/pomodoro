import React from "react";
import "./Control.css";

const Control = ({ isRunning, toggleTimer, resetTimer }) => {
  return (
    <div className="controls">
      <button onClick={toggleTimer}>
        {isRunning ? "Pausar" : "Iniciar"}
      </button>
      <button onClick={resetTimer}>Reiniciar</button>
    </div>
  );
};

export default Control;
