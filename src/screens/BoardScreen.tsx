import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import THEMES from '../themes';
import { Difficulty } from '../types/difficulties';
import useTheme from '../hooks/useTheme';
import SudokuBoard from '../components/SudokuBoard';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameContext from '../contexts/GameContext';

const BoardScreen = ({ navigation, route }) => {
  const { difficulty, daily }: {difficulty: Difficulty, daily: Boolean} = route.params;
  const [selectedCell, setSelectedCell] = useState();
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <GameContext.Provider value={{ selectedCell, setSelectedCell }}>
      <SafeAreaView style={styles.container}>
        <SudokuBoard daily={daily} difficulty={difficulty} />
      </SafeAreaView>
    </GameContext.Provider>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMES.backgroundColor[colorTheme]
  },
});

export default BoardScreen;