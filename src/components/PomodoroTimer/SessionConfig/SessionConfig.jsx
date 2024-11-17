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
    setShowSessionToggle(false); // Cierra el modal tras aceptar
  };

  return (
    <>
      <button
        className="session-config-toggle"
        onClick={() => setShowSessionToggle((prev) => !prev)}
      >
        Configuración de sesiones
      </button>

      {show && (
        <>
          <div
            className="session-config-overlay"
            onClick={() => setShowSessionToggle(false)}
          ></div>

          <div className="session-config-container">
            <div className="session-config-label">
              Número de Pomodoros:
            </div>
            <input
              type="number"
              className="session-config-input"
              min="1"
              value={newSessionCount}
              onChange={(e) => setNewSessionCount(Number(e.target.value))}
            />
            <div className="session-config-buttons">
              <button
                className="session-config-button"
                onClick={handleAccept}
              >
                Aceptar
              </button>
              <button
                className="session-config-button session-config-button--cancel"
                onClick={() => setShowSessionToggle(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SessionConfig;
