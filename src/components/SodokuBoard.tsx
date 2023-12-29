import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';
import { Difficulty } from '../types/difficulties';

const SodokuBoardRow = ({ rowData }: {rowData: Array<Number>}) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <View style={styles.boardRow}>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[0].toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[1].toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[2].toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[3].toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[4].toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[5].toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[6].toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[7].toString()}</Text></View>
      <View style={styles.cellContainer}><Text style={styles.cellText}>{rowData[8].toString()}</Text></View>
    </View>
  );
};

type SodokuBoardProps = {
  daily: Boolean,
  difficulty: Difficulty
};

const SodokuBoard = ({ daily, difficulty }: SodokuBoardProps) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <View style={styles.container}>
      <View style={styles.boardWrapper}>
        <SodokuBoardRow rowData={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <SodokuBoardRow rowData={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <SodokuBoardRow rowData={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <SodokuBoardRow rowData={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <SodokuBoardRow rowData={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <SodokuBoardRow rowData={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <SodokuBoardRow rowData={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <SodokuBoardRow rowData={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <SodokuBoardRow rowData={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
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
  }
});

export default SodokuBoard;