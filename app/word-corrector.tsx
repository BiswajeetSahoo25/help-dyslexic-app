import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';
import * as Haptics from 'expo-haptics';

interface SpellingError {
  word: string;
  position: number;
  suggestions: string[];
}

export default function WordCorrectorScreen() {
  const [inputText, setInputText] = useState('Ths is a sentance with som speling erors that ned to be corected.');
  const [correctedText, setCorrectedText] = useState('');
  const [errors, setErrors] = useState<SpellingError[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const checkSpelling = () => {
    setIsChecking(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Simulate spell checking process
    setTimeout(() => {
      const foundErrors = findSpellingErrors(inputText);
      setErrors(foundErrors);
      setIsChecking(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1000);
  };

  const findSpellingErrors = (text: string): SpellingError[] => {
    // Simple spell checker simulation
    const commonErrors: { [key: string]: string[] } = {
      'ths': ['this', 'the', 'thus'],
      'sentance': ['sentence'],
      'som': ['some', 'sum'],
      'speling': ['spelling'],
      'erors': ['errors'],
      'ned': ['need', 'end'],
      'corected': ['corrected'],
    };

    const words = text.toLowerCase().split(/\s+/);
    const foundErrors: SpellingError[] = [];

    words.forEach((word, index) => {
      const cleanWord = word.replace(/[^\w]/g, '');
      if (commonErrors[cleanWord]) {
        foundErrors.push({
          word: cleanWord,
          position: index,
          suggestions: commonErrors[cleanWord],
        });
      }
    });

    return foundErrors;
  };

  const applySuggestion = (error: SpellingError, suggestion: string) => {
    const words = inputText.split(/\s+/);
    words[error.position] = words[error.position].replace(error.word, suggestion);
    const newText = words.join(' ');
    setInputText(newText);
    
    // Remove this error from the list
    setErrors(prev => prev.filter(e => e !== error));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const autoCorrectAll = () => {
    let corrected = inputText;
    errors.forEach(error => {
      if (error.suggestions.length > 0) {
        corrected = corrected.replace(new RegExp(error.word, 'gi'), error.suggestions[0]);
      }
    });
    setCorrectedText(corrected);
    setInputText(corrected);
    setErrors([]);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const clearText = () => {
    setInputText('');
    setCorrectedText('');
    setErrors([]);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.row, commonStyles.paddingHorizontal, { paddingTop: 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} style={{ color: colors.text }} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { flex: 1, marginBottom: 0 }]}>Word Corrector</Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Text to Check</Text>
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
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter text to check for spelling errors..."
            placeholderTextColor={colors.textLight}
          />
          
          <View style={[commonStyles.row, { marginTop: 16 }]}>
            <Button
              text={isChecking ? 'Checking...' : 'Check Spelling'}
              onPress={checkSpelling}
              style={[
                isChecking ? buttonStyles.disabled : buttonStyles.primary,
                { flex: 1, marginRight: 8 }
              ]}
              textStyle={{ color: 'white' }}
              disabled={isChecking || !inputText.trim()}
            />
            <TouchableOpacity
              onPress={clearText}
              style={[buttonStyles.outline, { paddingHorizontal: 16 }]}
            >
              <Icon name="trash-outline" size={20} style={{ color: colors.primary }} />
            </TouchableOpacity>
          </View>
        </View>

        {errors.length > 0 && (
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={[commonStyles.subtitle, { flex: 1, marginBottom: 0 }]}>
                Found {errors.length} Error{errors.length !== 1 ? 's' : ''}
              </Text>
              <Button
                text="Fix All"
                onPress={autoCorrectAll}
                style={[buttonStyles.accent, { paddingHorizontal: 16, paddingVertical: 8 }]}
                textStyle={{ color: colors.text, fontSize: 14 }}
              />
            </View>

            {errors.map((error, index) => (
              <View
                key={index}
                style={[
                  {
                    backgroundColor: colors.background,
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: colors.error,
                  }
                ]}
              >
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                  "{error.word}" might be misspelled
                </Text>
                <Text style={[commonStyles.textLight, { marginBottom: 12 }]}>
                  Suggestions:
                </Text>
                <View style={commonStyles.row}>
                  {error.suggestions.map((suggestion, suggestionIndex) => (
                    <TouchableOpacity
                      key={suggestionIndex}
                      onPress={() => applySuggestion(error, suggestion)}
                      style={[
                        buttonStyles.outline,
                        {
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          marginRight: 8,
                          marginBottom: 8,
                        }
                      ]}
                    >
                      <Text style={[commonStyles.text, { color: colors.primary, marginBottom: 0, fontSize: 14 }]}>
                        {suggestion}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {errors.length === 0 && inputText.trim() && !isChecking && (
          <View style={[commonStyles.card, { backgroundColor: colors.success }]}>
            <View style={[commonStyles.row, commonStyles.center]}>
              <Icon name="checkmark-circle-outline" size={24} style={{ color: 'white', marginRight: 12 }} />
              <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
                No spelling errors found!
              </Text>
            </View>
          </View>
        )}

        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Tips for Better Spelling</Text>
          <View style={{ marginBottom: 12 }}>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
              • Read your text aloud to catch errors
            </Text>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
              • Break long words into smaller parts
            </Text>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
              • Use the spell checker regularly
            </Text>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 0 }]}>
              • Practice common word patterns
            </Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}