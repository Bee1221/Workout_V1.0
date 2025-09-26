
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { workoutCategories } from '../../data/workouts';
import { WorkoutCategory } from '../../types/workout';
import WorkoutCard from '../../components/WorkoutCard';
import Icon from '../../components/Icon';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [category, setCategory] = useState<WorkoutCategory | null>(null);

  useEffect(() => {
    if (id) {
      console.log('Loading category with id:', id);
      loadCategory(id);
    }
  }, [id]);

  const loadCategory = (categoryId: string) => {
    const foundCategory = workoutCategories.find(c => c.id === categoryId);
    if (foundCategory) {
      setCategory(foundCategory);
      console.log('Category loaded:', foundCategory.name);
    } else {
      console.log('Category not found');
      router.back();
    }
  };

  const handleWorkoutPress = (workoutId: string) => {
    console.log('Opening workout:', workoutId);
    router.push(`/workout/${workoutId}`);
  };

  if (!category) {
    return (
      <SafeAreaView style={commonStyles.centerContent}>
        <Text style={commonStyles.text}>Loading category...</Text>
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
          <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
            <Icon name={category.icon as any} size={24} color={colors.background} />
          </View>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            <Text style={styles.categoryDescription}>{category.description}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>
            {category.workouts.length} Workout{category.workouts.length !== 1 ? 's' : ''}
          </Text>
          
          {category.workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onPress={() => handleWorkoutPress(workout.id)}
            />
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
    marginRight: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
