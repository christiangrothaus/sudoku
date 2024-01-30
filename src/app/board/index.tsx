import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import SudokuBoard from '../../components/SudokuBoard';
import { EdgeInsets, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import GameContext from '../../contexts/GameContext';
import { SudokuBoard as SudokuBoardModel, SudokuCellPosition } from '../../models/sudoku';
import { checkIfBoardIsSolved, createSudokuBoard } from '../../utilities/sudokuBoard';
import BoardContext from '../../contexts/BoardContext';
import { clearStoredBoard, getBoard, storeBoard } from '../../utilities/storage';
import { router, useLocalSearchParams } from 'expo-router';
import IconButton from '../../components/IconButton';
import FullscreenLoading from '../../components/FullscreenLoading';
import { Difficulty } from '../../models/difficulties';

export type SearchParams = {
  difficulty?: '0' | '1' | '2',
  daily?: 'true' | 'false',
  useExistingBoard?: 'true' | 'false'
}

const getInitialBoard = async (difficulty: Difficulty, useExistingBoard: boolean): Promise<SudokuBoardModel> => {
  if (useExistingBoard) {
    const board = await getBoard();

    if (board?.[0]?.[0]) {
      return board as SudokuBoardModel;
    }
  }

  return createSudokuBoard(difficulty);
};

const Board = () => {
  const params = useLocalSearchParams();
  const difficulty = useMemo(() => Number(params.difficulty), [params.difficulty]);
  const useExistingBoard = useMemo(() => params.useExistingBoard === 'true', [params.useExistingBoard]);
  const [board, setBoard] = useState<SudokuBoardModel>();
  const [selectedCell, setSelectedCell] = useState<SudokuCellPosition>({ x: undefined, y: undefined });
  const safeAreaInsets = useSafeAreaInsets();
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme, safeAreaInsets);

  useEffect(() => {
    const setInitalBoard = async (): Promise<void> => {
      const board = await getInitialBoard(difficulty, useExistingBoard);

      setBoard(board);
    };

    setInitalBoard();
  }, [difficulty, useExistingBoard]);

  useEffect(() => {
    const isSolved = checkIfBoardIsSolved(board);
    if (isSolved) {
      clearStoredBoard();
      router.navigate('/');
    }
  }, [board]);

  const handleBack = useCallback((board: SudokuBoardModel) => {
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