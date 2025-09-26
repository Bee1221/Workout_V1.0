
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { workoutCategories, featuredWorkouts } from '../data/workouts';
import WorkoutCard from '../components/WorkoutCard';
import CategoryCard from '../components/CategoryCard';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const handleWorkoutPress = (workoutId: string) => {
    console.log('Opening workout:', workoutId);
    router.push(`/workout/${workoutId}`);
  };

  const handleCategoryPress = (categoryId: string) => {
    console.log('Opening category:', categoryId);
    router.push(`/category/${categoryId}`);
  };

  const handleProfilePress = () => {
    console.log('Opening profile');
    router.push('/profile');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={commonStyles.title}>Good Morning!</Text>
            <Text style={commonStyles.textSecondary}>Ready for your workout?</Text>
          </View>
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
            <Icon name="person-circle-outline" size={32} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Featured Workouts */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Featured Workouts</Text>
          {featuredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onPress={() => handleWorkoutPress(workout.id)}
            />
          ))}
        </View>

        {/* Categories */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Categories</Text>
          {workoutCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => handleCategoryPress(category.id)}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={[commonStyles.section, { marginBottom: 40 }]}>
          <Text style={commonStyles.subtitle}>Quick Actions</Text>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => router.push('/timer')}
          >
            <Icon name="timer-outline" size={24} color={colors.primary} />
            <Text style={styles.quickActionText}>Workout Timer</Text>
            <Icon name="chevron-forward-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  profileButton: {
    padding: 4,
  },
  quickActionButton: {
    ...commonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  quickActionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 12,
  },
});
