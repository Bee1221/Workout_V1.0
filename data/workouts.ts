
import { WorkoutCategory, Workout, Exercise } from '../types/workout';

const createExercise = (
  id: string,
  name: string,
  sets: number,
  reps: number,
  restTime: number,
  muscleGroups: string[],
  instructions?: string,
  weight?: number,
  duration?: number
): Exercise => ({
  id,
  name,
  sets,
  reps,
  weight,
  duration,
  restTime,
  instructions,
  muscleGroups,
});

const strengthExercises: Exercise[] = [
  createExercise('1', 'Push-ups', 3, 12, 60, ['Chest', 'Triceps', 'Shoulders'], 'Keep your body straight and lower until chest nearly touches ground'),
  createExercise('2', 'Squats', 3, 15, 60, ['Quadriceps', 'Glutes', 'Hamstrings'], 'Keep your back straight and lower until thighs are parallel to ground'),
  createExercise('3', 'Plank', 3, 0, 60, ['Core', 'Shoulders'], 'Hold position with straight body line', undefined, 30),
  createExercise('4', 'Lunges', 3, 10, 60, ['Quadriceps', 'Glutes', 'Hamstrings'], 'Step forward and lower back knee toward ground'),
  createExercise('5', 'Mountain Climbers', 3, 20, 45, ['Core', 'Shoulders', 'Legs'], 'Alternate bringing knees to chest in plank position'),
];

const cardioExercises: Exercise[] = [
  createExercise('6', 'Jumping Jacks', 4, 30, 30, ['Full Body'], 'Jump while spreading legs and raising arms overhead', undefined, 30),
  createExercise('7', 'High Knees', 4, 20, 30, ['Legs', 'Core'], 'Run in place bringing knees up to waist level'),
  createExercise('8', 'Burpees', 3, 8, 90, ['Full Body'], 'Squat, jump back to plank, push-up, jump forward, jump up'),
  createExercise('9', 'Running in Place', 3, 0, 60, ['Legs', 'Cardio'], 'Run in place at moderate pace', undefined, 60),
];

const yogaExercises: Exercise[] = [
  createExercise('10', 'Downward Dog', 1, 0, 30, ['Full Body'], 'Form inverted V shape with hands and feet on ground', undefined, 60),
  createExercise('11', 'Warrior I', 2, 0, 30, ['Legs', 'Core'], 'Lunge position with arms raised overhead', undefined, 45),
  createExercise('12', 'Child\'s Pose', 1, 0, 30, ['Back', 'Shoulders'], 'Kneel and sit back on heels, arms extended forward', undefined, 60),
  createExercise('13', 'Cat-Cow Stretch', 1, 10, 30, ['Back', 'Core'], 'Alternate between arching and rounding your back'),
];

const workouts: Workout[] = [
  {
    id: '1',
    name: 'Full Body Strength',
    description: 'Complete strength workout targeting all major muscle groups',
    category: 'Strength',
    duration: 30,
    difficulty: 'Intermediate',
    exercises: strengthExercises,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum calorie burn',
    category: 'Cardio',
    duration: 20,
    difficulty: 'Advanced',
    exercises: cardioExercises,
    imageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Morning Yoga Flow',
    description: 'Gentle yoga sequence to start your day with energy',
    category: 'Yoga',
    duration: 25,
    difficulty: 'Beginner',
    exercises: yogaExercises,
    imageUrl: 'https://images.unsplash.com/photo-1506629905607-d5b4c8b5e0b5?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Quick Strength',
    description: 'Short but effective strength training session',
    category: 'Strength',
    duration: 15,
    difficulty: 'Beginner',
    exercises: strengthExercises.slice(0, 3),
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
  },
];

export const workoutCategories: WorkoutCategory[] = [
  {
    id: '1',
    name: 'Strength',
    description: 'Build muscle and increase strength',
    color: '#FF6B6B',
    icon: 'barbell-outline',
    workouts: workouts.filter(w => w.category === 'Strength'),
  },
  {
    id: '2',
    name: 'Cardio',
    description: 'Improve cardiovascular health and burn calories',
    color: '#4ECDC4',
    icon: 'heart-outline',
    workouts: workouts.filter(w => w.category === 'Cardio'),
  },
  {
    id: '3',
    name: 'Yoga',
    description: 'Increase flexibility and find inner peace',
    color: '#45B7D1',
    icon: 'leaf-outline',
    workouts: workouts.filter(w => w.category === 'Yoga'),
  },
];

export const featuredWorkouts = workouts.slice(0, 3);
