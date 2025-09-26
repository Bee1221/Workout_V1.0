
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WorkoutCategory } from '../types/workout';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface CategoryCardProps {
  category: WorkoutCategory;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: category.color }]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
        <Icon name={category.icon as any} size={24} color={colors.background} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{category.name}</Text>
        <Text style={styles.description}>{category.description}</Text>
        <Text style={styles.workoutCount}>
          {category.workouts.length} workout{category.workouts.length !== 1 ? 's' : ''}
        </Text>
      </View>
      
      <Icon name="chevron-forward-outline" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    ...commonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  workoutCount: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

export default CategoryCard;
