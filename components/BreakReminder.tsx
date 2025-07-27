import React, { useState, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from './Button';
import Icon from './Icon';
import * as Haptics from 'expo-haptics';

interface BreakReminderProps {
  isVisible: boolean;
  onClose: () => void;
  onTakeBreak: () => void;
  breakDuration?: number;
}

export default function BreakReminder({ 
  isVisible, 
  onClose, 
  onTakeBreak, 
  breakDuration = 5 
}: BreakReminderProps) {
  const [countdown, setCountdown] = useState(breakDuration * 60);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }, [isVisible, fadeAnim]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isBreakActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsBreakActive(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            onClose();
            return breakDuration * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreakActive, countdown, breakDuration, onClose]);

  const startBreak = () => {
    setIsBreakActive(true);
    setCountdown(breakDuration * 60);
    onTakeBreak();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const skipBreak = () => {
    setIsBreakActive(false);
    setCountdown(breakDuration * 60);
    onClose();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreakPattern = () => {
    const patterns = [
      '🌟 ⭐ 🌟 ⭐ 🌟',
      '🔵 🟡 🔵 🟡 🔵',
      '💙 💛 💙 💛 💙',
      '✨ 🌙 ✨ 🌙 ✨',
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  };

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
        <Animated.View
          style={[
            commonStyles.card,
            {
              width: '100%',
              maxWidth: 400,
              opacity: fadeAnim,
              transform: [{
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                })
              }]
            }
          ]}
        >
          {!isBreakActive ? (
            <>
              <View style={[commonStyles.center, { marginBottom: 20 }]}>
                <Icon name="time-outline" size={48} style={{ color: colors.accent, marginBottom: 12 }} />
                <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 8 }]}>
                  Time for a Break!
                </Text>
                <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 16 }]}>
                  You&apos;ve been reading for a while. Taking regular breaks helps improve focus and comprehension.
                </Text>
                <Text style={[commonStyles.text, { textAlign: 'center', fontSize: 24, marginBottom: 0 }]}>
                  {getBreakPattern()}
                </Text>
              </View>

              <View style={[commonStyles.row, { marginTop: 20 }]}>
                <Button
                  text="Take Break"
                  onPress={startBreak}
                  style={[buttonStyles.primary, { flex: 1, marginRight: 8 }]}
                  textStyle={{ color: 'white' }}
                />
                <Button
                  text="Skip"
                  onPress={skipBreak}
                  style={[buttonStyles.outline, { flex: 1, marginLeft: 8 }]}
                  textStyle={{ color: colors.primary }}
                />
              </View>
            </>
          ) : (
            <>
              <View style={[commonStyles.center, { marginBottom: 20 }]}>
                <Icon name="leaf-outline" size={48} style={{ color: colors.success, marginBottom: 12 }} />
                <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 8 }]}>
                  Break Time
                </Text>
                <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 16 }]}>
                  Relax your eyes and mind. You can return to reading when the timer ends.
                </Text>
                
                <View style={[
                  commonStyles.center,
                  {
                    backgroundColor: colors.success,
                    borderRadius: 50,
                    width: 100,
                    height: 100,
                    marginBottom: 16,
                  }
                ]}>
                  <Text style={[commonStyles.title, { color: 'white', fontSize: 24, marginBottom: 0 }]}>
                    {formatTime(countdown)}
                  </Text>
                </View>

                <Text style={[commonStyles.text, { textAlign: 'center', fontSize: 20, marginBottom: 0 }]}>
                  {getBreakPattern()}
                </Text>
              </View>

              <Button
                text="End Break Early"
                onPress={skipBreak}
                style={[buttonStyles.outline]}
                textStyle={{ color: colors.primary }}
              />
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}