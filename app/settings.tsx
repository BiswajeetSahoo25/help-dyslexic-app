import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';
import * as Haptics from 'expo-haptics';

export default function SettingsScreen() {
  const [fontSize, setFontSize] = useState('medium');
  const [fontFamily, setFontFamily] = useState('lexend');
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [autoBreaks, setAutoBreaks] = useState(true);
  const [breakInterval, setBreakInterval] = useState(15);
  const [parentalControls, setParentalControls] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [wordSpacing, setWordSpacing] = useState('normal');

  const fontSizes = [
    { id: 'small', label: 'Small', value: 16 },
    { id: 'medium', label: 'Medium', value: 18 },
    { id: 'large', label: 'Large', value: 22 },
    { id: 'xlarge', label: 'Extra Large', value: 26 },
  ];

  const fontFamilies = [
    { id: 'lexend', label: 'Lexend (Recommended)', description: 'Designed for better reading proficiency' },
    { id: 'opendyslexic', label: 'OpenDyslexic', description: 'Specifically designed for dyslexic readers' },
    { id: 'system', label: 'System Default', description: 'Your device&apos;s default font' },
  ];

  const wordSpacings = [
    { id: 'normal', label: 'Normal' },
    { id: 'wide', label: 'Wide' },
    { id: 'extra-wide', label: 'Extra Wide' },
  ];

  const breakIntervals = [5, 10, 15, 20, 30];

  const handleSettingChange = (setting: string, value: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    switch (setting) {
      case 'fontSize':
        setFontSize(value);
        break;
      case 'fontFamily':
        setFontFamily(value);
        break;
      case 'hapticFeedback':
        setHapticFeedback(value);
        break;
      case 'autoBreaks':
        setAutoBreaks(value);
        break;
      case 'breakInterval':
        setBreakInterval(value);
        break;
      case 'parentalControls':
        setParentalControls(value);
        if (value) {
          Alert.alert(
            'Parental Controls',
            'Parental controls have been enabled. This will restrict access to certain features and require a PIN for changes.',
            [{ text: 'OK' }]
          );
        }
        break;
      case 'highContrast':
        setHighContrast(value);
        break;
      case 'wordSpacing':
        setWordSpacing(value);
        break;
    }
  };

  const resetToDefaults = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to their default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setFontSize('medium');
            setFontFamily('lexend');
            setHapticFeedback(true);
            setAutoBreaks(true);
            setBreakInterval(15);
            setParentalControls(false);
            setHighContrast(false);
            setWordSpacing('normal');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  };

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.row, commonStyles.paddingHorizontal, { paddingTop: 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} style={{ color: colors.text }} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { flex: 1, marginBottom: 0 }]}>Settings</Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Font Settings */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Font Settings</Text>
          
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>Font Size</Text>
          <View style={[commonStyles.row, { marginBottom: 16, flexWrap: 'wrap' }]}>
            {fontSizes.map((size) => (
              <TouchableOpacity
                key={size.id}
                onPress={() => handleSettingChange('fontSize', size.id)}
                style={[
                  buttonStyles.outline,
                  {
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    marginRight: 8,
                    marginBottom: 8,
                    backgroundColor: fontSize === size.id ? colors.primary : 'transparent',
                  }
                ]}
              >
                <Text
                  style={[
                    commonStyles.text,
                    {
                      color: fontSize === size.id ? 'white' : colors.primary,
                      marginBottom: 0,
                      fontSize: 14,
                    }
                  ]}
                >
                  {size.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>Font Family</Text>
          {fontFamilies.map((font) => (
            <TouchableOpacity
              key={font.id}
              onPress={() => handleSettingChange('fontFamily', font.id)}
              style={[
                {
                  backgroundColor: fontFamily === font.id ? colors.primary : colors.background,
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: fontFamily === font.id ? colors.primary : colors.border,
                }
              ]}
            >
              <Text
                style={[
                  commonStyles.text,
                  {
                    color: fontFamily === font.id ? 'white' : colors.text,
                    fontWeight: '600',
                    marginBottom: 4,
                  }
                ]}
              >
                {font.label}
              </Text>
              <Text
                style={[
                  commonStyles.textLight,
                  {
                    color: fontFamily === font.id ? 'rgba(255,255,255,0.8)' : colors.textLight,
                    marginBottom: 0,
                    fontSize: 14,
                  }
                ]}
              >
                {font.description}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>Word Spacing</Text>
          <View style={[commonStyles.row, { marginBottom: 0 }]}>
            {wordSpacings.map((spacing) => (
              <TouchableOpacity
                key={spacing.id}
                onPress={() => handleSettingChange('wordSpacing', spacing.id)}
                style={[
                  buttonStyles.outline,
                  {
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    marginRight: 8,
                    backgroundColor: wordSpacing === spacing.id ? colors.primary : 'transparent',
                  }
                ]}
              >
                <Text
                  style={[
                    commonStyles.text,
                    {
                      color: wordSpacing === spacing.id ? 'white' : colors.primary,
                      marginBottom: 0,
                      fontSize: 14,
                    }
                  ]}
                >
                  {spacing.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reading Assistance */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Reading Assistance</Text>
          
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                High Contrast Mode
              </Text>
              <Text style={[commonStyles.textLight, { marginBottom: 0, fontSize: 14 }]}>
                Increases text contrast for better readability
              </Text>
            </View>
            <Switch
              value={highContrast}
              onValueChange={(value) => handleSettingChange('highContrast', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={highContrast ? 'white' : colors.textLight}
            />
          </View>

          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                Haptic Feedback
              </Text>
              <Text style={[commonStyles.textLight, { marginBottom: 0, fontSize: 14 }]}>
                Vibration feedback for button presses
              </Text>
            </View>
            <Switch
              value={hapticFeedback}
              onValueChange={(value) => handleSettingChange('hapticFeedback', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={hapticFeedback ? 'white' : colors.textLight}
            />
          </View>

          <View style={[commonStyles.row, { marginBottom: 0 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                Auto Reading Breaks
              </Text>
              <Text style={[commonStyles.textLight, { marginBottom: 0, fontSize: 14 }]}>
                Automatic reminders to take breaks while reading
              </Text>
            </View>
            <Switch
              value={autoBreaks}
              onValueChange={(value) => handleSettingChange('autoBreaks', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={autoBreaks ? 'white' : colors.textLight}
            />
          </View>

          {autoBreaks && (
            <View style={{ marginTop: 16 }}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                Break Interval (minutes)
              </Text>
              <View style={[commonStyles.row, { flexWrap: 'wrap' }]}>
                {breakIntervals.map((interval) => (
                  <TouchableOpacity
                    key={interval}
                    onPress={() => handleSettingChange('breakInterval', interval)}
                    style={[
                      buttonStyles.outline,
                      {
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        marginRight: 8,
                        marginBottom: 8,
                        backgroundColor: breakInterval === interval ? colors.primary : 'transparent',
                      }
                    ]}
                  >
                    <Text
                      style={[
                        commonStyles.text,
                        {
                          color: breakInterval === interval ? 'white' : colors.primary,
                          marginBottom: 0,
                          fontSize: 14,
                        }
                      ]}
                    >
                      {interval}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Parental Controls */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Parental Controls</Text>
          
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                Enable Parental Controls
              </Text>
              <Text style={[commonStyles.textLight, { marginBottom: 0, fontSize: 14 }]}>
                Restrict access to certain features and settings
              </Text>
            </View>
            <Switch
              value={parentalControls}
              onValueChange={(value) => handleSettingChange('parentalControls', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={parentalControls ? 'white' : colors.textLight}
            />
          </View>

          {parentalControls && (
            <View style={[commonStyles.card, { backgroundColor: colors.background, marginBottom: 0 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                Parental Control Features:
              </Text>
              <Text style={[commonStyles.textLight, { marginBottom: 4, fontSize: 14 }]}>
                • Time limits for app usage
              </Text>
              <Text style={[commonStyles.textLight, { marginBottom: 4, fontSize: 14 }]}>
                • Progress tracking and reports
              </Text>
              <Text style={[commonStyles.textLight, { marginBottom: 4, fontSize: 14 }]}>
                • Content filtering options
              </Text>
              <Text style={[commonStyles.textLight, { marginBottom: 0, fontSize: 14 }]}>
                • PIN protection for settings
              </Text>
            </View>
          )}
        </View>

        {/* Reset Settings */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Reset Settings</Text>
          <Text style={[commonStyles.textLight, { marginBottom: 16 }]}>
            Reset all settings to their default values. This action cannot be undone.
          </Text>
          <Button
            text="Reset to Defaults"
            onPress={resetToDefaults}
            style={[buttonStyles.outline, { borderColor: colors.error }]}
            textStyle={{ color: colors.error }}
          />
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}