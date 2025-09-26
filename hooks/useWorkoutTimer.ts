
import { useState, useEffect, useRef } from 'react';

export const useWorkoutTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = () => {
    console.log('Timer started');
    setIsRunning(true);
  };

  const pause = () => {
    console.log('Timer paused');
    setIsRunning(false);
  };

  const reset = () => {
    console.log('Timer reset');
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
    formatTime: () => formatTime(seconds),
  };
};
