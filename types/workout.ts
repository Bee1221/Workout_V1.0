
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in seconds for time-based exercises
  restTime: number; // in seconds
  instructions?: string;
  muscleGroups: string[];
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number; // estimated duration in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: Exercise[];
  imageUrl?: string;
}

export interface WorkoutCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  workouts: Workout[];
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  date: Date;
  completedExercises: string[];
  duration: number; // actual duration in minutes
  notes?: string;
}

export interface UserProgress {
  totalWorkouts: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  favoriteCategory: string;
  recentSessions: WorkoutSession[];
}
