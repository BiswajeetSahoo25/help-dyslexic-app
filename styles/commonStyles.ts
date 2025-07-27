import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#4A90E2',      // Calming light blue
  secondary: '#7BB3F0',    // Lighter blue
  accent: '#FFD700',       // Yellow for highlights
  background: '#F8F9FA',   // Light background
  backgroundAlt: '#FFFFFF', // White background
  text: '#2C3E50',         // Dark grey text
  textLight: '#5A6C7D',    // Lighter grey text
  success: '#27AE60',      // Green for success
  warning: '#F39C12',      // Orange for warnings
  error: '#E74C3C',        // Red for errors
  highlight: '#FFD700',    // Yellow highlight
  card: '#FFFFFF',         // White cards
  border: '#E1E8ED',       // Light border
  disabled: '#BDC3C7',     // Disabled state
};

export const dyslexicFriendly = {
  fontSize: {
    small: 16,
    medium: 18,
    large: 22,
    xlarge: 26,
  },
  lineHeight: {
    small: 24,
    medium: 27,
    large: 33,
    xlarge: 39,
  },
  letterSpacing: 1.2,
  wordSpacing: 4,
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(74, 144, 226, 0.3)',
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(123, 179, 240, 0.3)',
    elevation: 2,
  },
  accent: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(255, 215, 0, 0.3)',
    elevation: 2,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: dyslexicFriendly.fontSize.xlarge,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    lineHeight: dyslexicFriendly.lineHeight.xlarge,
    letterSpacing: dyslexicFriendly.letterSpacing,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: dyslexicFriendly.fontSize.large,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    lineHeight: dyslexicFriendly.lineHeight.large,
    letterSpacing: dyslexicFriendly.letterSpacing,
  },
  text: {
    fontSize: dyslexicFriendly.fontSize.medium,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 12,
    lineHeight: dyslexicFriendly.lineHeight.medium,
    letterSpacing: dyslexicFriendly.letterSpacing,
  },
  textLight: {
    fontSize: dyslexicFriendly.fontSize.medium,
    fontWeight: '400',
    color: colors.textLight,
    marginBottom: 12,
    lineHeight: dyslexicFriendly.lineHeight.medium,
    letterSpacing: dyslexicFriendly.letterSpacing,
  },
  highlightedText: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 16,
  },
  padding: {
    padding: 16,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  paddingVertical: {
    paddingVertical: 16,
  },
});