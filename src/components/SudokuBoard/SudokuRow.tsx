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
  const rowData = board[row];

  return (
    <View style={styles.boardRow}>
      <SudokuCell cell={rowData[0]} cellPosition={[row, 0]}/>
      <SudokuCell cell={rowData[1]} cellPosition={[row, 1]}/>
      <SudokuCell cell={rowData[2]} cellPosition={[row, 2]}/>
      <View style={styles.verticalDivider} />
      <SudokuCell cell={rowData[3]} cellPosition={[row, 3]}/>
      <SudokuCell cell={rowData[4]} cellPosition={[row, 4]}/>
      <SudokuCell cell={rowData[5]} cellPosition={[row, 5]}/>
      <View style={styles.verticalDivider} />
      <SudokuCell cell={rowData[6]} cellPosition={[row, 6]}/>
      <SudokuCell cell={rowData[7]} cellPosition={[row, 7]}/>
      <SudokuCell cell={rowData[8]} cellPosition={[row, 8]}/>
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