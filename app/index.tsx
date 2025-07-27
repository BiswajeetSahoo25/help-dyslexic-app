import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';
import * as Haptics from 'expo-haptics';

export default function MainScreen() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning!');
    } else if (hour < 18) {
      setGreeting('Good Afternoon!');
    } else {
      setGreeting('Good Evening!');
    }
  }, []);

  const handleFeaturePress = (feature: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log(`Navigating to ${feature}`);
    router.push(`/${feature}`);
  };

  const features = [
    {
      id: 'reader',
      title: 'Text Reader',
      description: 'Read text with highlighting and speech',
      icon: 'book-outline',
      color: colors.primary,
    },
    {
      id: 'speech-to-text',
      title: 'Speech to Text',
      description: 'Convert your speech to written text',
      icon: 'mic-outline',
      color: colors.secondary,
    },
    {
      id: 'text-simplifier',
      title: 'Text Simplifier',
      description: 'Make complex text easier to understand',
      icon: 'text-outline',
      color: colors.accent,
    },
    {
      id: 'word-corrector',
      title: 'Word Corrector',
      description: 'Check and correct spelling mistakes',
      icon: 'checkmark-circle-outline',
      color: colors.success,
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Customize fonts, breaks, and controls',
      icon: 'settings-outline',
      color: colors.textLight,
    },
  ];

  return (
    <View style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={[commonStyles.center, { marginVertical: 32 }]}>
          <Text style={commonStyles.title}>DysLexiHelp</Text>
          <Text style={[commonStyles.text, { textAlign: 'center', color: colors.textLight }]}>
            {greeting} Ready to make reading easier?
          </Text>
        </View>

        <View style={{ marginBottom: 32 }}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[
                commonStyles.card,
                {
                  borderLeftWidth: 4,
                  borderLeftColor: feature.color,
                  marginBottom: 16,
                }
              ]}
              onPress={() => handleFeaturePress(feature.id)}
              activeOpacity={0.7}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Icon 
                      name={feature.icon as any} 
                      size={24} 
                      style={{ color: feature.color, marginRight: 12 }} 
                    />
                    <Text style={[commonStyles.subtitle, { marginBottom: 0 }]}>
                      {feature.title}
                    </Text>
                  </View>
                  <Text style={[commonStyles.textLight, { marginBottom: 0 }]}>
                    {feature.description}
                  </Text>
                </View>
                <Icon 
                  name="chevron-forward-outline" 
                  size={20} 
                  style={{ color: colors.textLight }} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[commonStyles.card, { backgroundColor: colors.primary, marginBottom: 32 }]}>
          <Text style={[commonStyles.subtitle, { color: 'white', textAlign: 'center' }]}>
            Quick Tip
          </Text>
          <Text style={[commonStyles.text, { color: 'white', textAlign: 'center', marginBottom: 0 }]}>
            Use the Text Reader to practice reading with word-by-word highlighting and audio support!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}