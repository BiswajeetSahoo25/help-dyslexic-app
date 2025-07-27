import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';
import * as Haptics from 'expo-haptics';

export default function TextSimplifierScreen() {
  const [inputText, setInputText] = useState('The implementation of comprehensive educational methodologies necessitates the utilization of multifaceted pedagogical approaches to facilitate optimal learning outcomes.');
  const [simplifiedText, setSimplifiedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const simplifyText = () => {
    setIsProcessing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Simulate text simplification process
    setTimeout(() => {
      const simplified = simplifyTextLogic(inputText);
      setSimplifiedText(simplified);
      setIsProcessing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  };

  const simplifyTextLogic = (text: string): string => {
    // Simple text simplification rules
    const replacements: { [key: string]: string } = {
      'implementation': 'use',
      'comprehensive': 'complete',
      'methodologies': 'methods',
      'necessitates': 'needs',
      'utilization': 'use',
      'multifaceted': 'many-sided',
      'pedagogical': 'teaching',
      'facilitate': 'help',
      'optimal': 'best',
      'outcomes': 'results',
      'educational': 'learning',
    };

    let simplified = text.toLowerCase();
    
    // Replace complex words with simpler ones
    Object.keys(replacements).forEach(complex => {
      const simple = replacements[complex];
      simplified = simplified.replace(new RegExp(complex, 'g'), simple);
    });

    // Break long sentences
    simplified = simplified.replace(/,\s+/g, '. ');
    
    // Capitalize first letter of sentences
    simplified = simplified.replace(/(^|\. )(\w)/g, (match, p1, p2) => p1 + p2.toUpperCase());

    return simplified;
  };

  const clearText = () => {
    setInputText('');
    setSimplifiedText('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const copyToReader = () => {
    if (simplifiedText.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.push('/reader');
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.row, commonStyles.paddingHorizontal, { paddingTop: 16 }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} style={{ color: colors.text }} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { flex: 1, marginBottom: 0 }]}>Text Simplifier</Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Original Text</Text>
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
            placeholder="Enter complex text to simplify..."
            placeholderTextColor={colors.textLight}
          />
          
          <View style={[commonStyles.row, { marginTop: 16 }]}>
            <Button
              text={isProcessing ? 'Simplifying...' : 'Simplify Text'}
              onPress={simplifyText}
              style={[
                isProcessing ? buttonStyles.disabled : buttonStyles.primary,
                { flex: 1, marginRight: 8 }
              ]}
              textStyle={{ color: 'white' }}
              disabled={isProcessing || !inputText.trim()}
            />
            <TouchableOpacity
              onPress={clearText}
              style={[buttonStyles.outline, { paddingHorizontal: 16 }]}
            >
              <Icon name="trash-outline" size={20} style={{ color: colors.primary }} />
            </TouchableOpacity>
          </View>
        </View>

        {simplifiedText ? (
          <View style={commonStyles.card}>
            <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Simplified Text</Text>
            <View
              style={[
                {
                  borderWidth: 1,
                  borderColor: colors.success,
                  borderRadius: 8,
                  padding: 12,
                  backgroundColor: colors.backgroundAlt,
                  minHeight: 120,
                }
              ]}
            >
              <Text style={[commonStyles.text, { marginBottom: 0 }]}>
                {simplifiedText}
              </Text>
            </View>
            
            <View style={[commonStyles.row, { marginTop: 16 }]}>
              <Button
                text="Read Aloud"
                onPress={copyToReader}
                style={[buttonStyles.secondary, { flex: 1, marginRight: 8 }]}
                textStyle={{ color: 'white' }}
              />
              <Button
                text="Copy Text"
                onPress={() => {
                  // In a real app, this would copy to clipboard
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }}
                style={[buttonStyles.outline, { flex: 1, marginLeft: 8 }]}
                textStyle={{ color: colors.primary }}
              />
            </View>
          </View>
        ) : null}

        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>How It Works</Text>
          <View style={{ marginBottom: 12 }}>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
              • Replaces complex words with simpler alternatives
            </Text>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
              • Breaks long sentences into shorter ones
            </Text>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
              • Improves readability for dyslexic users
            </Text>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 0 }]}>
              • Maintains the original meaning
            </Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}