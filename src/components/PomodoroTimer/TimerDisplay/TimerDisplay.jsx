import React from "react";
import "./TimerDisplay.css";

const TimerDisplay = ({ timeLeft, isBreak }) => {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className={`circle ${isBreak ? "break" : ""}`}>
      <span>{`${minutes}:${seconds}`}</span>
    </div>
  );
};

export default TimerDisplay;
