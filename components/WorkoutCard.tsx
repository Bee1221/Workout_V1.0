
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Workout } from '../types/workout';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onPress }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return colors.success;
      case 'Intermediate':
        return colors.warning;
      case 'Advanced':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {workout.imageUrl && (
        <Image source={{ uri: workout.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{workout.name}</Text>
        <Text style={styles.description}>{workout.description}</Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="time-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{workout.duration} min</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="fitness-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{workout.exercises.length} exercises</Text>
          </View>
          
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workout.difficulty) }]}>
            <Text style={styles.difficultyText}>{workout.difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    ...commonStyles.card,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.background,
  },
});

export default WorkoutCard;
