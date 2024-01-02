import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';
import { Difficulty } from '../types/difficulties';
import SudokuBoardClass from '../classes/SudokuBoard';

const SudokuBoardRow = ({ rowData }: {rowData: number[]}) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <View style={styles.boardRow}>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[0]}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[1]}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[2]}</Text></View>
      <View style={styles.verticalDivider} />
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[3]}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[4]}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[5]}</Text></View>
      <View style={styles.verticalDivider} />
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[6]}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[7]}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[8]}</Text></View>
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

  const board = new SudokuBoardClass();

  return (
    <View style={styles.container}>
      <View style={styles.boardWrapper}>
        <SudokuBoardRow rowData={board.getRow(0)}/>
        <SudokuBoardRow rowData={board.getRow(1)}/>
        <SudokuBoardRow rowData={board.getRow(2)}/>
        <View style={styles.hortizontalDivider} />
        <SudokuBoardRow rowData={board.getRow(3)}/>
        <SudokuBoardRow rowData={board.getRow(4)}/>
        <SudokuBoardRow rowData={board.getRow(5)}/>
        <View style={styles.hortizontalDivider} />
        <SudokuBoardRow rowData={board.getRow(6)}/>
        <SudokuBoardRow rowData={board.getRow(7)}/>
        <SudokuBoardRow rowData={board.getRow(8)}/>
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