import React from 'react';
import { View, StyleSheet } from 'react-native';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import SudokuNumberSelector from './NumberSelector';
import SudokuBoardRow from './SudokuRow';
import Timer from './Timer';

const SudokuBoard = () => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <>
      <View style={styles.boardToolsContainer}>
        <Timer />
        <View style={styles.boardContainer}>
          <View style={styles.boardWrapper}>
            <SudokuBoardRow row={0}/>
            <SudokuBoardRow row={1}/>
            <SudokuBoardRow row={2}/>
            <View style={styles.hortizontalDivider} />
            <SudokuBoardRow row={3}/>
            <SudokuBoardRow row={4}/>
            <SudokuBoardRow row={5}/>
            <View style={styles.hortizontalDivider} />
            <SudokuBoardRow row={6}/>
            <SudokuBoardRow row={7}/>
            <SudokuBoardRow row={8}/>
          </View>
        </View>
      </View>
      <SudokuNumberSelector />
    </>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  boardToolsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  boardContainer: {
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
  hortizontalDivider: {
    backgroundColor: THEMES.color[colorTheme],
    height: 2,
    alignSelf: 'stretch'
  }
});

export default SudokuBoard;