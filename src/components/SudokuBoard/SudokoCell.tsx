import React, { useCallback, useContext, useMemo } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import GameContext from '../../contexts/GameContext';
import { SudokuCell as SudokuCellType, SudokuCellPosition } from '../../models/sudoku';
import { equals } from 'ramda';
import { getIsCellRelevant } from '../../utilities/sudokuBoard';

const SudokuCell = ({ cell, cellPosition }: {cell: SudokuCellType, cellPosition: SudokuCellPosition}) => {
  const colorTheme = useTheme();
  const { selectedCell, setSelectedCell } = useContext(GameContext);
  const isSelectedCell = useMemo(() => equals(selectedCell, cellPosition), [cellPosition, selectedCell]);
  const isRelevantCell = useMemo(() => {
    return getIsCellRelevant(selectedCell, cellPosition);
  }, [cellPosition, selectedCell]);
  const styles = styleSheet(colorTheme, isSelectedCell, isRelevantCell, cell.isGenerated);

  const handlePress = useCallback(() => {
    setSelectedCell(cellPosition);
  }, [cellPosition, setSelectedCell]);

  return (
    <Pressable style={styles.cellWrapper} onPress={handlePress}>
      <Text adjustsFontSizeToFit style={styles.cellText}>{cell.number}</Text>
    </Pressable>
  );
};

const styleSheet = (colorTheme, isSelectedCell, isRelevantCell, isGeneratedNumber) => StyleSheet.create({
  cellWrapper: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isSelectedCell ? THEMES.accentColor[colorTheme] : isRelevantCell ? THEMES.cellSecondaryColor[colorTheme] : undefined,
    borderColor: THEMES.boardSecondaryOutlineColor[colorTheme],
    borderWidth: 1
  },
  cellText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: isGeneratedNumber ? THEMES.color[colorTheme] : THEMES.enteredNumberColor[colorTheme],
    fontWeight: 'bold',
    fontSize: 100
  }
});

export default SudokuCell;