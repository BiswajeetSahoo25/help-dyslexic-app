import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';

export default function ReaderScreen() {
  const [text, setText] = useState('Welcome to the Text Reader! This tool will help you read text with word-by-word highlighting and audio support. You can paste any text here and use the controls below to customize your reading experience.');
  const [isReading, setIsReading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [readingSpeed, setReadingSpeed] = useState(0.8);
  const [words, setWords] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const wordArray = text.split(/\s+/).filter(word => word.length > 0);
    setWords(wordArray);
    setCurrentWordIndex(-1);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      Speech.stop();
    };
  }, []);

  const startReading = async () => {
    if (isReading) {
      stopReading();
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsReading(true);
    setCurrentWordIndex(0);

    // Start text-to-speech
    Speech.speak(text, {
      rate: readingSpeed,
      onDone: () => {
        setIsReading(false);
        setCurrentWordIndex(-1);
      },
      onStopped: () => {
        setIsReading(false);
        setCurrentWordIndex(-1);
      },
    });

    // Start word highlighting
    const wordsPerMinute = readingSpeed * 200; // Approximate words per minute
    const intervalTime = (60 / wordsPerMinute) * 1000; // Time per word in milliseconds

    intervalRef.current = setInterval(() => {
      setCurrentWordIndex(prev => {
        if (prev >= words.length - 1) {
          stopReading();
          return -1;
        }
        return prev + 1;
      });
    }, intervalTime);
  };

  const stopReading = () => {
    setIsReading(false);
    setCurrentWordIndex(-1);
    Speech.stop();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const adjustSpeed = (increment: number) => {
    const newSpeed = Math.max(0.3, Math.min(1.5, readingSpeed + increment));
    setReadingSpeed(newSpeed);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderTextWithHighlight = () => {
    return words.map((word, index) => (
      <Text
        key={index}
        style={[
          commonStyles.text,
          {
            backgroundColor: index === currentWordIndex ? colors.highlight : 'transparent',
            paddingHorizontal: index === currentWordIndex ? 4 : 0,
            paddingVertical: index === currentWordIndex ? 2 : 0,
            borderRadius: index === currentWordIndex ? 4 : 0,
            marginRight: 6,
            display: 'inline',
          }
        ]}
      >
        {word}{' '}
      </Text>
    ));
  };

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.row, commonStyles.paddingHorizontal, { paddingTop: 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} style={{ color: colors.text }} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { flex: 1, marginBottom: 0 }]}>Text Reader</Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Enter Text to Read</Text>
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
            value={text}
            onChangeText={setText}
            placeholder="Paste or type your text here..."
            placeholderTextColor={colors.textLight}
          />
        </View>

        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Reading Controls</Text>
          
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <Button
              text={isReading ? 'Stop Reading' : 'Start Reading'}
              onPress={startReading}
              style={[
                isReading ? buttonStyles.accent : buttonStyles.primary,
                { flex: 1, marginRight: 8 }
              ]}
              textStyle={{ color: isReading ? colors.text : 'white' }}
            />
            <TouchableOpacity
              onPress={stopReading}
              style={[buttonStyles.outline, { paddingHorizontal: 16 }]}
            >
              <Icon name="stop-outline" size={20} style={{ color: colors.primary }} />
            </TouchableOpacity>
          </View>

          <View style={[commonStyles.row, { alignItems: 'center' }]}>
            <Text style={[commonStyles.text, { marginRight: 12, marginBottom: 0 }]}>Speed:</Text>
            <TouchableOpacity
              onPress={() => adjustSpeed(-0.1)}
              style={[buttonStyles.outline, { paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 }]}
            >
              <Icon name="remove-outline" size={16} style={{ color: colors.primary }} />
            </TouchableOpacity>
            <Text style={[commonStyles.text, { marginBottom: 0, minWidth: 40, textAlign: 'center' }]}>
              {readingSpeed.toFixed(1)}x
            </Text>
            <TouchableOpacity
              onPress={() => adjustSpeed(0.1)}
              style={[buttonStyles.outline, { paddingHorizontal: 12, paddingVertical: 8, marginLeft: 8 }]}
            >
              <Icon name="add-outline" size={16} style={{ color: colors.primary }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Reading Preview</Text>
          <View style={{ minHeight: 200 }}>
            {renderTextWithHighlight()}
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}