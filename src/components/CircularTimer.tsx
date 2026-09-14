import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { Typography } from './Typography';
import { theme } from '../theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularTimerProps {
  size?: number;
  strokeWidth?: number;
  durationSeconds: number;
  remainingSeconds: number;
}

export function CircularTimer({ 
  size = 200, 
  strokeWidth = 8, 
  durationSeconds, 
  remainingSeconds 
}: CircularTimerProps) {
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percent = Math.max(0, remainingSeconds) / durationSeconds;
  
  // Transition to danger color in the last 10 seconds
  const isDanger = remainingSeconds <= 10;
  const strokeColor = isDanger ? theme.colors.danger : theme.colors.secondary;
  
  // Tabular string format for the time (e.g. 01:23)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) {
      return `${m}:${s.toString().padStart(2, '0')}`;
    }
    return s.toString();
  };

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference - (percent * circumference),
    };
  }, [percent]);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        {/* Background Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.surface}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Active Track */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.centerContainer}>
        <Typography 
          variant="timer" 
          color={isDanger ? theme.colors.danger : theme.colors.text} 
          style={{ fontVariant: ['tabular-nums'] }}
        >
          {formatTime(Math.max(0, remainingSeconds))}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
