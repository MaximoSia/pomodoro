import React, { useState, useEffect } from "react";
import "./PomodoroTimer.css";

const PomodoroTimer = ({ task }) => {
  const INITIAL_TIME = 0.1 * 60; // Tiempo inicial del Pomodoro (25 minutos)
  const BREAK_TIME = 0.1 * 60; // Tiempo de descanso (5 minutos)

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false); // Para distinguir entre trabajo y descanso
  const [autoStartBreak, setAutoStartBreak] = useState(false); // Nuevo estado

  // Sessions
  const [sessionCount, setSessionCount] = useState(1); // Cantidad total de Pomodoros en una sesión
  const [currentPomodoro, setCurrentPomodoro] = useState(0); // Pomodoro actual
  const [showSessionToggle, setShowSessionToggle] = useState(false); // Mostrar/ocultar el toggle de configuración

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    setTimeLeft(INITIAL_TIME);
    setIsRunning(false);
    setIsBreak(false);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }

    if (timeLeft === 0) {
      setIsRunning(false); // Detenemos el temporizador

      if (isBreak) {
        setTimeLeft(INITIAL_TIME); // Reinicia el tiempo de trabajo
        setIsBreak(false); // Cambia a estado de trabajo
      } else {
        setTimeLeft(BREAK_TIME); // Configura el tiempo de descanso
        setIsBreak(true); // Cambia a estado de descanso
        setCurrentPomodoro((prev) => {
          const newPomodoroCount = prev + 1; // Incrementa el contador
          return newPomodoroCount;
        });
        if (autoStartBreak) {
          setIsRunning(true); // Comienza el descanso automáticamente si está activado
        }
      }
    }

    // Aquí verificamos si la sesión se completó después de que el contador haya cambiado.
    if (currentPomodoro >= sessionCount && !isBreak) {
      handleSessionComplete(); // Completa la sesión si terminaste todos los Pomodoros
    }
  }, [isRunning, timeLeft, isBreak, autoStartBreak, currentPomodoro, sessionCount]);



  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");


  const handleSessionAccept = () => {
    setShowSessionToggle(false);
    setCurrentPomodoro(0); // Reinicia el progreso de la sesión
  };

  const handleSessionComplete = () => {
    alert("¡Felicidades, completaste tu sesión de estudio!");
    resetTimer();
  };

  return (
    <div className="timer">
      <h2>
        {isBreak ? "Tiempo de Descanso" : `Tarea actual: ${task?.name || "Ninguna"}`}
      </h2>

      {/* Sessions */}
      <p>
        {currentPomodoro >= 0
          ? `Pomodoro ${currentPomodoro}/${sessionCount}`
          : "Configura tus sesiones de estudio"}
      </p>


      <div className={`circle ${isBreak ? "break" : ""}`}>
        <span>{`${minutes}:${seconds}`}</span>
      </div>
      <div className="controls">
        <button onClick={toggleTimer}>{isRunning ? "Pausar" : "Iniciar"}</button>
        <button onClick={resetTimer}>Reiniciar</button>
      </div>
      <div className="settings">

        <div>
          <label>
            <input
              type="checkbox"
              checked={autoStartBreak}
              onChange={() => setAutoStartBreak((prev) => !prev)}
            />
            Iniciar descanso automáticamente
          </label>
        </div>

        <div>
          <button onClick={() => setShowSessionToggle((prev) => !prev)}>
            {showSessionToggle ? "Cancelar" : "Configurar Sesiones"}
          </button>

          <div className={`sessionToggle ${showSessionToggle ? "open" : "closed"}`}>
            <label>
              Número de Pomodoros:{" "}
              <input
                type="number"
                min="1"
                value={sessionCount}
                onChange={(e) => setSessionCount(Number(e.target.value))}
              />
            </label>
            <button onClick={handleSessionAccept}>Aceptar</button>
          </div>
        </div>

      </div>
    </div >
  );
};

export default PomodoroTimer;
