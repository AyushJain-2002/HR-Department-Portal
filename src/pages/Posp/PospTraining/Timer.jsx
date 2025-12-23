import React from 'react';
import { Typography } from '@material-tailwind/react';

const Timer = ({ elapsedTime, isTimerRunning }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="timer-container">
      <Typography variant="h5" color="blue-gray">
        Timer: {formatTime(elapsedTime)} 
      </Typography>
      {!isTimerRunning && (
        <Typography variant="body1" color="red">
          Timer paused due to inactivity.
        </Typography>
      )}
    </div>
  );
};

export default Timer;
