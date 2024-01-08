import React, { useCallback, useContext } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import GameContext from '../../contexts/GameContext';
import { SudokuCell as SudokuCellType, SudokuCellPosition } from '../../types/sudoku';
import { equals } from 'ramda';

const SudokuCell = ({ cell, cellPosition }: {cell: SudokuCellType, cellPosition: SudokuCellPosition}) => {
  const colorTheme = useTheme();
  const { selectedCell, setSelectedCell } = useContext(GameContext);
  const isSelectedCell = equals(selectedCell, cellPosition);
  const styles = styleSheet(colorTheme, isSelectedCell);

  const handlePress = useCallback(() => {
    setSelectedCell(cellPosition);
  }, []);

  return (
    <Pressable style={styles.cellWrapper} onPress={handlePress}>
      <Text adjustsFontSizeToFit style={styles.cellText}>{cell.number}</Text>
    </Pressable>
  );
};

const styleSheet = (colorTheme, isSelectedCell) => StyleSheet.create({
  cellWrapper: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isSelectedCell ? THEMES.accentColor[colorTheme] : undefined,
    borderColor: THEMES.boardSecondaryOutlineColor[colorTheme],
    borderWidth: 1
  },
  cellText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: THEMES.color[colorTheme],
    fontWeight: 'bold',
    fontSize: 100
  }
});

export default SudokuCell;