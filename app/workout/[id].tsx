
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { workoutCategories } from '../../data/workouts';
import { Workout, Exercise } from '../../types/workout';
import ExerciseCard from '../../components/ExerciseCard';
import Icon from '../../components/Icon';
import { useWorkoutTimer } from '../../hooks/useWorkoutTimer';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const timer = useWorkoutTimer();

  useEffect(() => {
    if (id) {
      console.log('Loading workout with id:', id);
      loadWorkout(id);
    }
  }, [id]);

  const loadWorkout = (workoutId: string) => {
    const foundWorkout = workoutCategories
      .flatMap(category => category.workouts)
      .find(w => w.id === workoutId);
    
    if (foundWorkout) {
      setWorkout(foundWorkout);
      console.log('Workout loaded:', foundWorkout.name);
    } else {
      console.log('Workout not found');
      Alert.alert('Error', 'Workout not found');
      router.back();
    }
  };

  const handleStartWorkout = () => {
    console.log('Starting workout');
    setIsWorkoutStarted(true);
    timer.start();
  };

  const handleCompleteExercise = (exerciseId: string) => {
    console.log('Completing exercise:', exerciseId);
    const newCompleted = new Set(completedExercises);
    newCompleted.add(exerciseId);
    setCompletedExercises(newCompleted);

    // Move to next exercise
    if (currentExerciseIndex < (workout?.exercises.length || 0) - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  };

  const handleFinishWorkout = () => {
    console.log('Finishing workout');
    timer.pause();
    Alert.alert(
      'Workout Complete!',
      `Great job! You completed the workout in ${timer.formatTime()}.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const isWorkoutComplete = workout && completedExercises.size === workout.exercises.length;

  if (!workout) {
    return (
      <SafeAreaView style={commonStyles.centerContent}>
        <Text style={commonStyles.text}>Loading workout...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.workoutTitle}>{workout.name}</Text>
          {isWorkoutStarted && (
            <Text style={styles.timer}>{timer.formatTime()}</Text>
          )}
        </View>
        <View style={styles.headerRight}>
          {isWorkoutStarted && (
            <TouchableOpacity onPress={timer.isRunning ? timer.pause : timer.start}>
              <Icon 
                name={timer.isRunning ? "pause-outline" : "play-outline"} 
                size={24} 
                color={colors.primary} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Workout Info */}
        <View style={styles.workoutInfo}>
          <Text style={commonStyles.text}>{workout.description}</Text>
          <View style={styles.workoutStats}>
            <View style={styles.statItem}>
              <Icon name="time-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.statText}>{workout.duration} min</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="fitness-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.statText}>{workout.exercises.length} exercises</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="checkmark-circle-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.statText}>{completedExercises.size}/{workout.exercises.length}</Text>
            </View>
          </View>
        </View>

        {/* Start/Finish Button */}
        {!isWorkoutStarted ? (
          <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        ) : isWorkoutComplete ? (
          <TouchableOpacity style={styles.finishButton} onPress={handleFinishWorkout}>
            <Text style={styles.finishButtonText}>Finish Workout</Text>
          </TouchableOpacity>
        ) : null}

        {/* Exercises */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Exercises</Text>
          {workout.exercises.map((exercise, index) => (
            <View key={exercise.id}>
              <ExerciseCard
                exercise={exercise}
                isCompleted={completedExercises.has(exercise.id)}
              />
              {isWorkoutStarted && 
               !completedExercises.has(exercise.id) && 
               index === currentExerciseIndex && (
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => handleCompleteExercise(exercise.id)}
                >
                  <Text style={styles.completeButtonText}>Mark Complete</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  headerRight: {
    width: 32,
    alignItems: 'flex-end',
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  timer: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginTop: 2,
  },
  workoutInfo: {
    marginBottom: 20,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingVertical: 16,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  startButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
  },
  finishButton: {
    backgroundColor: colors.success,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  finishButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: colors.success,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  completeButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
