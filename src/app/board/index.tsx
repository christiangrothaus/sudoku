import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import SudokuBoard from '../../components/SudokuBoard';
import { EdgeInsets, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import GameContext from '../../contexts/GameContext';
import { SudokuBoard as SudokuBoardModel } from '../../models/sudoku';
import { createSudokuBoard } from '../../utilities/sudokuBoard';
import BoardContext from '../../contexts/BoardContext';
import { getBoard, storeBoard } from '../../utilities/storage';
import { router, useLocalSearchParams } from 'expo-router';
import IconButton from '../../components/IconButton';
import FullscreenLoading from '../../components/FullscreenLoading';

export type SearchParams = {
  difficulty?: '0' | '1' | '2',
  daily?: 'true' | 'false',
  useExistingBoard?: 'true' | 'false'
}

const getInitialBoardFromParams = async (params: SearchParams): Promise<SudokuBoardModel> => {
  const { difficulty, useExistingBoard } = params;
  if (useExistingBoard === 'true') {
    const board = await getBoard();

    if (board?.[0]?.[0]) {
      return board as SudokuBoardModel;
    }
  }

  return createSudokuBoard(Number(difficulty));
};

const Board = () => {
  const params = useLocalSearchParams();
  const [board, setBoard] = useState<SudokuBoardModel>();
  const [selectedCell, setSelectedCell] = useState();
  const safeAreaInsets = useSafeAreaInsets();
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme, safeAreaInsets);

  useEffect(() => {
    const setInitalBoard = async (): Promise<void> => {
      const board = await getInitialBoardFromParams(params);

      setBoard(board);
    };

    setInitalBoard();
  }, []);

  const handleBack = useCallback((board) => {
    storeBoard(board, (isSaved) => {
      if (isSaved) {
        router.navigate('/');
      }
    });
  }, []);

  if (!board) {
    return (
      <FullscreenLoading />
    );
  }

  return (
    <BoardContext.Provider value={[board, setBoard]}>
      <GameContext.Provider value={{ selectedCell, setSelectedCell }}>
        <SafeAreaView style={styles.container}>
          <IconButton onPress={() => handleBack(board)} name="arrow-back" style={styles.backButton} />
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

export default Board;