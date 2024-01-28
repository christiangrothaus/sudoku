import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';
import MenuLink from '../components/MenuLink';
import { getBoard } from '../utilities/storage';
import { SudokuBoard } from '../models/sudoku';

const HomeScreen = () => {
  const colorTheme = useTheme();
  const [existingBoard, setExistingBoard] = useState<SudokuBoard>();
  const styles = styleSheet(colorTheme);

  useEffect(() => {
    const setBoard = async () => {
      const board = await getBoard();

      if (board?.[0]?.[0]) {
        setExistingBoard(board as SudokuBoard);
      }
    };

    setBoard();
  });

  return (
    <View style={styles.container}>
      {existingBoard && <MenuLink href={{ pathname: '/board', params: { useExistingBoard: true } }} text="Resume" />}
      <MenuLink href="/select-difficulty" text="Start" />
      <MenuLink href="/board" text="Daily Puzzle" />
    </View>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMES.backgroundColor[colorTheme],
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default HomeScreen;