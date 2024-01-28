import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

const FullscreenLoading = () => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  container: {
    backgroundColor: THEMES.backgroundColor[colorTheme],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
});

export default FullscreenLoading;