
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Exercise } from '../types/workout';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isCompleted = false }) => {
  const formatExerciseDetails = () => {
    if (exercise.duration) {
      return `${exercise.sets} sets × ${exercise.duration}s`;
    }
    return `${exercise.sets} sets × ${exercise.reps} reps`;
  };

  return (
    <View style={[styles.card, isCompleted && styles.completedCard]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, isCompleted && styles.completedText]}>
            {exercise.name}
          </Text>
          <Text style={styles.details}>{formatExerciseDetails()}</Text>
        </View>
        
        {isCompleted && (
          <View style={styles.checkIcon}>
            <Icon name="checkmark-circle" size={24} color={colors.success} />
          </View>
        )}
      </View>
      
      <View style={styles.muscleGroups}>
        {exercise.muscleGroups.map((muscle, index) => (
          <View key={index} style={styles.muscleTag}>
            <Text style={styles.muscleText}>{muscle}</Text>
          </View>
        ))}
      </View>
      
      {exercise.instructions && (
        <Text style={styles.instructions}>{exercise.instructions}</Text>
      )}
      
      <View style={styles.restTime}>
        <Icon name="time-outline" size={16} color={colors.textSecondary} />
        <Text style={styles.restText}>Rest: {exercise.restTime}s</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...commonStyles.card,
    marginBottom: 12,
  },
  completedCard: {
    backgroundColor: colors.backgroundAlt,
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  details: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  checkIcon: {
    marginLeft: 12,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  muscleTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  muscleText: {
    fontSize: 12,
    color: colors.background,
    fontWeight: '500',
  },
  instructions: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  restTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});

export default ExerciseCard;
