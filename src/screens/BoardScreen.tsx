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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SudokuBoard as SudokuBoardModel } from '../models/sudoku';
import { StorageKeys } from '../models/storage';
import { createSudokuBoard } from '../utilities/sudokuBoard';
import BoardContext from '../contexts/BoardContext';

const storeBoard = async (board: SudokuBoardModel, successCallback: (success: boolean) => void) => {
  try {
    const serializedBoard = JSON.stringify(board);
    await AsyncStorage.setItem(StorageKeys.BOARD, serializedBoard);
    successCallback(true);
  } catch {
    successCallback(false);
  }
};

const BoardScreen = ({ route, navigation }) => {
  const { difficulty, daily }: {difficulty: Difficulty, daily: Boolean} = route.params;
  const [board, setBoard] = useState(createSudokuBoard(difficulty));
  const [selectedCell, setSelectedCell] = useState();
  const safeAreaInsets = useSafeAreaInsets();
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme, safeAreaInsets);

  const handleBack = useCallback(() => {
    storeBoard(board, (isSaved) => {
      if (isSaved) {
        navigation.navigate(Screen.HOME);
      }
    });
  }, []);

  return (
    <BoardContext.Provider value={[board, setBoard]}>
      <GameContext.Provider value={{ selectedCell, setSelectedCell }}>
        <SafeAreaView style={styles.container}>
          <IconButton onPress={handleBack} name="arrow-left" style={styles.backButton} />
          <SudokuBoard />
        </SafeAreaView>
      </GameContext.Provider>
    </BoardContext.Provider>
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