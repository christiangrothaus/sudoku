import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import { Difficulty } from '../../types/difficulties';
import SudokuBoardClass from '../../classes/SudokuBoard';
import SudokuNumberSelector from './NumberSelector';
import SudokuBoardRow from './SudokuRow';
import BoardContext from '../../contexts/BoardContext';

type SudokuBoardProps = {
  daily: Boolean,
  difficulty: Difficulty
};

const SudokuBoard = ({ daily, difficulty }: SudokuBoardProps) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  const board = useMemo(() => new SudokuBoardClass(), []);

  return (
    <BoardContext.Provider value={board}>
      <View style={styles.container}>
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
      <SudokuNumberSelector />
    </BoardContext.Provider>
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
  hortizontalDivider: {
    backgroundColor: THEMES.color[colorTheme],
    height: 2,
    alignSelf: 'stretch'
  }
});

export default SudokuBoard;