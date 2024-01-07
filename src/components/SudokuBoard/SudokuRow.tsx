import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import SudokuCell from './SudokoCell';
import BoardContext from '../../contexts/BoardContext';

const SudokuBoardRow = ({ row }: {row: number}) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);
  const board = useContext(BoardContext);
  const rowData = board.getRow(row);

  return (
    <View style={styles.boardRow}>
      <SudokuCell value={rowData[0]} cellPosition={[row, 0]}/>
      <SudokuCell value={rowData[1]} cellPosition={[row, 1]}/>
      <SudokuCell value={rowData[2]} cellPosition={[row, 2]}/>
      <View style={styles.verticalDivider} />
      <SudokuCell value={rowData[3]} cellPosition={[row, 3]}/>
      <SudokuCell value={rowData[4]} cellPosition={[row, 4]}/>
      <SudokuCell value={rowData[5]} cellPosition={[row, 5]}/>
      <View style={styles.verticalDivider} />
      <SudokuCell value={rowData[6]} cellPosition={[row, 6]}/>
      <SudokuCell value={rowData[7]} cellPosition={[row, 7]}/>
      <SudokuCell value={rowData[8]} cellPosition={[row, 8]}/>
    </View>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  boardRow: {
    flexDirection: 'row',
  },
  verticalDivider: {
    backgroundColor: THEMES.color[colorTheme],
    width: 2
  },
});

export default SudokuBoardRow;