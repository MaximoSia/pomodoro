import React, { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay/TimerDisplay";
import Control from "./Control/Control";
import SessionConfig from "./SessionConfig/SessionConfig";
import "./PomodoroTimer.css";
import startSound from '../../sounds/start.mp3';
import breakSound from '../../sounds/break.mp3';

const PomodoroTimer = ({ task }) => {
  const INITIAL_TIME = 25 * 60; // Tiempo inicial del Pomodoro (25 minutos)
  const BREAK_TIME = 25 * 60; // Tiempo de descanso (5 minutos)

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPomodoro, setCurrentPomodoro] = useState(0);
  const [sessionCount, setSessionCount] = useState(1);
  const [autoStartBreak, setAutoStartBreak] = useState(false);
  const [showSessionToggle, setShowSessionToggle] = useState(false);

  // Par: concentración
  // Impar: descanso
  const isBreak = currentPomodoro % 2 !== 0; // Determina si es descanso

  // Manejo del temporizador
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Manejo de finalización del temporizador
  useEffect(() => {
    if (timeLeft > 0) return;

    if (currentPomodoro >= sessionCount * 2) {
      handleSessionComplete();
    } else {
      setCurrentPomodoro((prev) => prev + 1);
      setTimeLeft(isBreak ? INITIAL_TIME : BREAK_TIME);

      // Pausar el temporizador después de cada período
      setIsRunning(false);

      // Reproducir sonido al finalizar un pomodoro
      const audio = new Audio(breakSound);
      audio.play();

      if (autoStartBreak && !isBreak) {
        setIsRunning(true);
      }
    }
  }, [timeLeft, currentPomodoro, sessionCount, isBreak, autoStartBreak]);

  // Manejo de completar la sesión
  const handleSessionComplete = () => {
    alert("¡Felicidades, completaste tu sesión de estudio!");
    setIsRunning(false);
    setTimeLeft(INITIAL_TIME);
    setCurrentPomodoro(0);
  };

  const resetTimer = () => {
    setIsRunning(false);

    // Siempre reinicia hacia el estado de concentración
    setTimeLeft(INITIAL_TIME);

    // Si estás en descanso, regresa a la concentración ajustando currentPomodoro al inicio de un Pomodoro
    if (isBreak) {
      setCurrentPomodoro((prev) => prev - 1); // Vuelve al Pomodoro anterior
    }
  };

  // Manejo de la configuración de sesión
  const handleSessionAccept = (newSessionCount) => {
    setSessionCount(newSessionCount);
    setShowSessionToggle(false);
    resetTimer();
  };
  // Manejo de inicio de temporizador
  const handleStart = () => {
    setIsRunning(true);
    // Reproducir sonido al iniciar un pomodoro
    const audio = new Audio(startSound);
    audio.play();
  };

  return (
    <div className="timer">
      <h2>{isBreak ? "Tiempo de Descanso" : `Tarea: ${task?.name || "Ninguna"}`}</h2>
      <p>{`Pomodoro ${Math.floor(currentPomodoro / 2) + 1}/${sessionCount}`}</p>

      <TimerDisplay timeLeft={timeLeft} isBreak={isBreak} />

      <Control
        isRunning={isRunning}
        toggleTimer={() => {
          if (!isRunning) handleStart();
          else setIsRunning(false);
        }}
        resetTimer={resetTimer}
      />

      <SessionConfig
        show={showSessionToggle}
        sessionCount={sessionCount}
        setShowSessionToggle={setShowSessionToggle}
        onAccept={handleSessionAccept}
      />

      <div className="settings">
        <label>
          <input
            type="checkbox"
            checked={autoStartBreak}
            onChange={() => setAutoStartBreak((prev) => !prev)}
          />
          Iniciar descanso automáticamente
        </label>
      </div>
    </div>
  );
};

export default PomodoroTimer;