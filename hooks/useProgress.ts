
import { useState, useEffect } from 'react';
import { UserProgress, WorkoutSession } from '../types/workout';

const initialProgress: UserProgress = {
  totalWorkouts: 0,
  totalMinutes: 0,
  currentStreak: 0,
  longestStreak: 0,
  favoriteCategory: 'Strength',
  recentSessions: [],
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);

  useEffect(() => {
    // In a real app, this would load from AsyncStorage or a backend
    console.log('Loading user progress');
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      // Simulate loading from storage
      console.log('Progress loaded');
    } catch (error) {
      console.log('Error loading progress:', error);
    }
  };

  const addWorkoutSession = (session: WorkoutSession) => {
    console.log('Adding workout session:', session.workoutId);
    setProgress(prev => ({
      ...prev,
      totalWorkouts: prev.totalWorkouts + 1,
      totalMinutes: prev.totalMinutes + session.duration,
      recentSessions: [session, ...prev.recentSessions.slice(0, 9)], // Keep last 10 sessions
    }));
  };

  const updateStreak = () => {
    // Logic to calculate current streak based on recent sessions
    console.log('Updating workout streak');
  };

  return {
    progress,
    addWorkoutSession,
    updateStreak,
  };
};
