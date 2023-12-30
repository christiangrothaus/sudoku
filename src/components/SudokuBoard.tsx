import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';
import { Difficulty } from '../types/difficulties';
import SudokuGame from '../classes/SudokuGame';
import { SudokuCell } from '../types/sudoku';

const SudokuBoardRow = ({ rowData }: {rowData: SudokuCell[]}) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <View style={styles.boardRow}>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[0]?.number?.toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[1]?.number?.toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[2]?.number?.toString()}</Text></View>
      <View style={styles.verticalDivider} />
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[3]?.number?.toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[4]?.number?.toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[5]?.number?.toString()}</Text></View>
      <View style={styles.verticalDivider} />
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[6]?.number?.toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[7]?.number?.toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[8]?.number?.toString()}</Text></View>
    </View>
  );
};

type SudokuBoardProps = {
  daily: Boolean,
  difficulty: Difficulty
};

const SudokuBoard = ({ daily, difficulty }: SudokuBoardProps) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  const game = new SudokuGame(difficulty, daily);
  const board = game.getBoard();

  return (
    <View style={styles.container}>
      <View style={styles.boardWrapper}>
        <SudokuBoardRow rowData={board[0]}/>
        <SudokuBoardRow rowData={board[1]}/>
        <SudokuBoardRow rowData={board[2]}/>
        <View style={styles.hortizontalDivider} />
        <SudokuBoardRow rowData={board[3]}/>
        <SudokuBoardRow rowData={board[4]}/>
        <SudokuBoardRow rowData={board[5]}/>
        <View style={styles.hortizontalDivider} />
        <SudokuBoardRow rowData={board[6]}/>
        <SudokuBoardRow rowData={board[7]}/>
        <SudokuBoardRow rowData={board[8]}/>
      </View>
    </View>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardWrapper: {
    borderColor: THEMES.color[colorTheme],
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardRow: {
    flexDirection: 'row',
  },
  cellContainer: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: THEMES.boardSecondaryOutlineColor[colorTheme],
    borderWidth: 1
  },
  cellText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: THEMES.color[colorTheme],
    fontWeight: 'bold'
  },
  verticalDivider: {
    backgroundColor: THEMES.color[colorTheme],
    width: 2
  },
  hortizontalDivider: {
    backgroundColor: THEMES.color[colorTheme],
    height: 2,
    alignSelf: 'stretch'
  }
});

export default SudokuBoard;