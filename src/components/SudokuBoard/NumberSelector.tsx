import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

const SudokuNumberButton = ({ value }) => {
  const colorTheme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const deviceWidth = Dimensions.get('window').width;
  const styles = styleSheet({ colorTheme, safeAreaInsets, deviceWidth });

  const handlePress = useCallback(() => {
  }, []);

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
      <SudokuNumberButton value={1} />
      <SudokuNumberButton value={2} />
      <SudokuNumberButton value={3} />
      <SudokuNumberButton value={4} />
      <SudokuNumberButton value={5} />
      <SudokuNumberButton value={6} />
      <SudokuNumberButton value={7} />
      <SudokuNumberButton value={8} />
      <SudokuNumberButton value={9} />
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