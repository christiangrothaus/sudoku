import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';
import MenuButton from '../components/MenuButton';
import { Screen } from '../models/screens';

const HomeScreen = ({ navigation }) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  const handleStart = useCallback(() => navigation.navigate(Screen.DIFFICULTY), []);
  const handleDaily = useCallback(() => navigation.navigate(Screen.BOARD, { daily: true }), []);

  return (
    <View style={styles.container}>
      <MenuButton onPress={handleStart}>Start</MenuButton>
      <MenuButton onPress={handleDaily}>Daily Puzzle</MenuButton>
    </View>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMES.backgroundColor[colorTheme],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;