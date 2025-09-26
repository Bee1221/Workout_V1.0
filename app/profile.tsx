
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { useProgress } from '../hooks/useProgress';
import ProgressChart from '../components/ProgressChart';
import Icon from '../components/Icon';

export default function ProfileScreen() {
  const { progress } = useProgress();

  const handleTimerPress = () => {
    console.log('Opening timer');
    router.push('/timer');
  };

  const stats = [
    {
      label: 'Total Workouts',
      value: progress.totalWorkouts.toString(),
      icon: 'fitness-outline',
      color: colors.primary,
    },
    {
      label: 'Total Minutes',
      value: progress.totalMinutes.toString(),
      icon: 'time-outline',
      color: colors.success,
    },
    {
      label: 'Current Streak',
      value: `${progress.currentStreak} days`,
      icon: 'flame-outline',
      color: colors.warning,
    },
    {
      label: 'Longest Streak',
      value: `${progress.longestStreak} days`,
      icon: 'trophy-outline',
      color: colors.error,
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Icon name="person-outline" size={48} color={colors.textSecondary} />
          </View>
          <Text style={styles.userName}>Fitness Enthusiast</Text>
          <Text style={styles.userSubtitle}>Keep up the great work!</Text>
        </View>

        {/* Progress Overview */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>This Week&apos;s Progress</Text>
          <View style={styles.progressContainer}>
            <ProgressChart
              progress={65}
              size={120}
              color={colors.primary}
              label="Weekly Goal"
            />
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>4</Text>
                <Text style={styles.progressLabel}>Workouts</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>120</Text>
                <Text style={styles.progressLabel}>Minutes</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                  <Icon name={stat.icon as any} size={20} color={colors.background} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[commonStyles.section, { marginBottom: 40 }]}>
          <Text style={commonStyles.subtitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleTimerPress}>
            <Icon name="timer-outline" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Workout Timer</Text>
            <Icon name="chevron-forward-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="settings-outline" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Settings</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  headerRight: {
    width: 32,
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressStats: {
    flex: 1,
    marginLeft: 24,
  },
  progressStat: {
    alignItems: 'center',
    marginBottom: 16,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actionButton: {
    ...commonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 12,
  },
});
