import React from 'react';
import { StyleSheet } from 'react-native';
import THEMES from '../themes';
import { Difficulty } from '../types/difficulties';
import useTheme from '../hooks/useTheme';
import SudokuBoard from '../components/SudokuBoard';
import { SafeAreaView } from 'react-native-safe-area-context';

const BoardScreen = ({ navigation, route }) => {
  const { difficulty, daily }: {difficulty: Difficulty, daily: Boolean} = route.params;
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <SafeAreaView style={styles.container}>
      <SudokuBoard daily={daily} difficulty={difficulty} />
    </SafeAreaView>
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

export default BoardScreen;