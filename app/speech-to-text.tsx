import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';
import * as Haptics from 'expo-haptics';

export default function SpeechToTextScreen() {
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [savedTexts, setSavedTexts] = useState<string[]>([]);

  const startListening = () => {
    // Note: Web Speech API is not available in React Native
    // This is a simulation for demonstration
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsListening(true);
    
    // Simulate speech recognition
    setTimeout(() => {
      const simulatedText = "This is a simulated speech-to-text conversion. In a real implementation, this would use the device's speech recognition capabilities.";
      setTranscribedText(prev => prev + (prev ? ' ' : '') + simulatedText);
      setIsListening(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const clearText = () => {
    setTranscribedText('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const saveText = () => {
    if (transcribedText.trim()) {
      setSavedTexts(prev => [transcribedText, ...prev.slice(0, 4)]); // Keep last 5 texts
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Success', 'Text saved successfully!');
    }
  };

  const copyToReader = () => {
    if (transcribedText.trim()) {
      // In a real app, you would pass this text to the reader screen
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Alert.alert('Success', 'Text copied to reader!', [
        { text: 'OK', onPress: () => router.push('/reader') }
      ]);
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.row, commonStyles.paddingHorizontal, { paddingTop: 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} style={{ color: colors.text }} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { flex: 1, marginBottom: 0 }]}>Speech to Text</Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={[commonStyles.card, commonStyles.center]}>
          <Icon 
            name={isListening ? "mic" : "mic-outline"} 
            size={64} 
            style={{ 
              color: isListening ? colors.accent : colors.primary,
              marginBottom: 16 
            }} 
          />
          <Text style={[commonStyles.subtitle, { textAlign: 'center', marginBottom: 8 }]}>
            {isListening ? 'Listening...' : 'Tap to Start Speaking'}
          </Text>
          <Text style={[commonStyles.textLight, { textAlign: 'center', marginBottom: 24 }]}>
            {isListening ? 'Speak clearly into your device' : 'Press the button below to start recording'}
          </Text>
          
          <View style={[commonStyles.row, { width: '100%' }]}>
            <Button
              text={isListening ? 'Stop Listening' : 'Start Listening'}
              onPress={isListening ? stopListening : startListening}
              style={[
                isListening ? buttonStyles.accent : buttonStyles.primary,
                { flex: 1, marginRight: 8 }
              ]}
              textStyle={{ color: isListening ? colors.text : 'white' }}
            />
            <TouchableOpacity
              onPress={clearText}
              style={[buttonStyles.outline, { paddingHorizontal: 16 }]}
            >
              <Icon name="trash-outline" size={20} style={{ color: colors.primary }} />
            </TouchableOpacity>
          </View>
        </View>

        {transcribedText ? (
          <View style={commonStyles.card}>
            <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Transcribed Text</Text>
            <TextInput
              style={[
                commonStyles.text,
                {
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  minHeight: 120,
                  textAlignVertical: 'top',
                  backgroundColor: colors.backgroundAlt,
                }
              ]}
              multiline
              value={transcribedText}
              onChangeText={setTranscribedText}
              placeholder="Your speech will appear here..."
              placeholderTextColor={colors.textLight}
            />
            
            <View style={[commonStyles.row, { marginTop: 16 }]}>
              <Button
                text="Save Text"
                onPress={saveText}
                style={[buttonStyles.secondary, { flex: 1, marginRight: 8 }]}
                textStyle={{ color: 'white' }}
              />
              <Button
                text="Read Aloud"
                onPress={copyToReader}
                style={[buttonStyles.primary, { flex: 1, marginLeft: 8 }]}
                textStyle={{ color: 'white' }}
              />
            </View>
          </View>
        ) : null}

        {savedTexts.length > 0 && (
          <View style={commonStyles.card}>
            <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Recent Texts</Text>
            {savedTexts.map((text, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  {
                    backgroundColor: colors.background,
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => setTranscribedText(text)}
              >
                <Text style={[commonStyles.text, { marginBottom: 0 }]} numberOfLines={2}>
                  {text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}