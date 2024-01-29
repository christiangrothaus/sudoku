import React, { Fragment, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import SudokuCell from './SudokoCell';
import BoardContext from '../../contexts/BoardContext';

const SudokuBoardRow = ({ row }: {row: number}) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);
  const [board] = useContext(BoardContext);
  const rowData = board[row];

  return (
    <View style={styles.boardRow}>
      {rowData.map((cell, index) => {
        const cellPosition = { x: index, y: row };
        const shouldHaveDivider = (index + 1) % 3 === 0;

        return ( // Using index as a key since this array never will change size or be reordered
          <Fragment key={index}>
            <SudokuCell cell={cell} cellPosition={cellPosition} />
            {shouldHaveDivider && <View style={styles.verticalDivider} />}
          </Fragment>
        );
      })}
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