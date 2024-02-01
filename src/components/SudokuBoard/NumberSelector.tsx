import React, { useCallback, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CELL_VALUES } from '../../constants/sudoku';
import GameContext from '../../contexts/GameContext';
import { clone } from 'ramda';

const SudokuNumberButton = ({ value }) => {
  const colorTheme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const deviceWidth = Dimensions.get('window').width;
  const { selectedCell, board, setBoard } = useContext(GameContext);
  const styles = styleSheet({ colorTheme, safeAreaInsets, deviceWidth });

  const handlePress = useCallback(() => {
    const clonedBoard = clone(board);

    clonedBoard[selectedCell.y][selectedCell.x].number = value;

    setBoard(clonedBoard);
  }, [board, selectedCell.x, selectedCell.y, setBoard, value]);

  return (
    <Pressable onPress={handlePress}>
      <Text adjustsFontSizeToFit style={styles.text}>
        {value}
      </Text>
    </Pressable>
  );
};

const SudokuNumberSelector = () => {
  const colorTheme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const deviceWidth = Dimensions.get('window').width;
  const styles = styleSheet({ colorTheme, safeAreaInsets, deviceWidth });

  return (
    <View style={styles.container}>
      {CELL_VALUES.map((value) => {
        return <SudokuNumberButton key={value} value={value} />;
      })}
    </View>
  );
};

type StyleSheetType = {
  colorTheme: string,
  safeAreaInsets: EdgeInsets,
  deviceWidth: number
}

const styleSheet = ({ colorTheme, safeAreaInsets, deviceWidth }: StyleSheetType) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    bottom: safeAreaInsets.bottom + 40,
    right: 0,
    left: 0
  },
  text: {
    marginHorizontal: 10,
    fontSize: 100,
    fontWeight: 'bold',
    color: THEMES.color[colorTheme],
    maxWidth: deviceWidth / 8,
    maxHeight: deviceWidth / 8
  }
});

export default SudokuNumberSelector;