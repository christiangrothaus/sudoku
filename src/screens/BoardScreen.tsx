import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import THEMES from '../themes';
import { Difficulty } from '../models/difficulties';
import useTheme from '../hooks/useTheme';
import SudokuBoard from '../components/SudokuBoard';
import { EdgeInsets, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import GameContext from '../contexts/GameContext';
import IconButton from '../components/IconButton';
import { Screen } from '../models/screens';

const BoardScreen = ({ route, navigation }) => {
  const { difficulty, daily }: {difficulty: Difficulty, daily: Boolean} = route.params;
  const [selectedCell, setSelectedCell] = useState();
  const safeAreaInsets = useSafeAreaInsets();
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme, safeAreaInsets);

  const handleBack = useCallback(() => {
    navigation.navigate(Screen.HOME);
  }, []);

  return (
    <GameContext.Provider value={{ selectedCell, setSelectedCell }}>
      <SafeAreaView style={styles.container}>
        <IconButton onPress={handleBack} name="arrow-left" style={styles.backButton} />
        <SudokuBoard daily={daily} difficulty={difficulty} />
      </SafeAreaView>
    </GameContext.Provider>
  );
};

const styleSheet = (colorTheme, safeAreaInsets: EdgeInsets) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMES.backgroundColor[colorTheme]
  },
  backButton: {
    flex: 1,
    position: 'absolute',
    marginTop: safeAreaInsets.top,
    marginLeft: 10
  }
});

export default BoardScreen;