import React, { useState } from "react";
import "./SessionConfig.css";

const SessionConfig = ({
  show,
  sessionCount,
  setShowSessionToggle,
  onAccept,
}) => {
  const [newSessionCount, setNewSessionCount] = useState(sessionCount);

  const handleAccept = () => {
    onAccept(newSessionCount);
  };

  return (
    <>
      <button onClick={() => setShowSessionToggle((pev) => !pev)}>
        Configuración de sesiones
      </button >
      {show && (
        <div>
          <label>
            Número de Pomodoros:{" "}
            <input
              type="number"
              min="1"
              value={newSessionCount}
              onChange={(e) => setNewSessionCount(Number(e.target.value))}
            />
          </label>
          <div>
            <button onClick={handleAccept}>Aceptar</button>
            <button onClick={() => setShowSessionToggle(false)}>Cancelar</button>
          </div>
        </div>
      )
      }
    </>
  );
};

export default SessionConfig;
