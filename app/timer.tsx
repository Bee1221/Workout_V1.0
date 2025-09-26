
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { useWorkoutTimer } from '../hooks/useWorkoutTimer';
import Icon from '../components/Icon';

export default function TimerScreen() {
  const timer = useWorkoutTimer();
  const [restTimer, setRestTimer] = useState(0);
  const [isRestMode, setIsRestMode] = useState(false);

  const handleStartRest = (seconds: number) => {
    console.log('Starting rest timer:', seconds);
    setRestTimer(seconds);
    setIsRestMode(true);
    // In a real app, you'd implement a countdown timer here
    setTimeout(() => {
      setIsRestMode(false);
      setRestTimer(0);
      Alert.alert('Rest Complete!', 'Time to get back to your workout!');
    }, seconds * 1000);
  };

  const restOptions = [30, 60, 90, 120];

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workout Timer</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        {/* Main Timer */}
        <View style={styles.timerSection}>
          <Text style={styles.timerLabel}>Workout Time</Text>
          <Text style={styles.timerDisplay}>{timer.formatTime()}</Text>
          
          <View style={styles.timerControls}>
            <TouchableOpacity
              style={[styles.controlButton, styles.resetButton]}
              onPress={timer.reset}
            >
              <Icon name="refresh-outline" size={24} color={colors.background} />
              <Text style={styles.controlButtonText}>Reset</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.controlButton, timer.isRunning ? styles.pauseButton : styles.playButton]}
              onPress={timer.isRunning ? timer.pause : timer.start}
            >
              <Icon 
                name={timer.isRunning ? "pause-outline" : "play-outline"} 
                size={32} 
                color={colors.background} 
              />
              <Text style={styles.controlButtonText}>
                {timer.isRunning ? 'Pause' : 'Start'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rest Timer */}
        <View style={styles.restSection}>
          <Text style={styles.sectionTitle}>Rest Timer</Text>
          
          {isRestMode ? (
            <View style={styles.restActive}>
              <Text style={styles.restDisplay}>{restTimer}s</Text>
              <Text style={styles.restLabel}>Rest in progress...</Text>
              <TouchableOpacity
                style={styles.skipRestButton}
                onPress={() => {
                  setIsRestMode(false);
                  setRestTimer(0);
                }}
              >
                <Text style={styles.skipRestText}>Skip Rest</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.restOptions}>
              {restOptions.map((seconds) => (
                <TouchableOpacity
                  key={seconds}
                  style={styles.restButton}
                  onPress={() => handleStartRest(seconds)}
                >
                  <Text style={styles.restButtonText}>{seconds}s</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Session Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.floor(timer.seconds / 60)}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{timer.seconds % 60}</Text>
              <Text style={styles.statLabel}>Seconds</Text>
            </View>
          </View>
        </View>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  timerSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  timerLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 16,
  },
  timerDisplay: {
    fontSize: 72,
    fontWeight: '300',
    color: colors.text,
    marginBottom: 32,
    fontFamily: 'monospace',
  },
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    minWidth: 100,
  },
  playButton: {
    backgroundColor: colors.success,
  },
  pauseButton: {
    backgroundColor: colors.warning,
  },
  resetButton: {
    backgroundColor: colors.textSecondary,
  },
  controlButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  restSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  restActive: {
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 24,
  },
  restDisplay: {
    fontSize: 48,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  restLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  skipRestButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  skipRestText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  restOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  restButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  statsSection: {
    marginBottom: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
