import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Difficulty } from '../models/difficulties';
import MenuButton from '../components/MenuButton';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../models/screens';

const DifficultyScreen = ({ navigation }) => {
  const colorTheme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const styles = styleSheet(colorTheme, safeAreaInsets);

  const handleBack = useCallback(() => navigation.navigate('Home'), []);

  const navigateToBoard = useCallback((difficulty: Difficulty) => {
    navigation.navigate(Screen.BOARD, { difficulty });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <Ionicons
          name="arrow-back"
          size={50}
          color={THEMES.color[colorTheme]}
          onPress={handleBack}
        />
      </View>
      <View style={styles.difficultyContainer}>
        <MenuButton onPress={() => navigateToBoard(Difficulty.Easy)}>
          {Difficulty[Difficulty.Easy]}
        </MenuButton>
        <MenuButton onPress={() => navigateToBoard(Difficulty.Medium)}>
          {Difficulty[Difficulty.Medium]}
        </MenuButton>
        <MenuButton onPress={() => navigateToBoard(Difficulty.Hard)}>
          {Difficulty[Difficulty.Hard]}
        </MenuButton>
      </View>
    </View>
  );
};

const styleSheet = (colorTheme, safeAreaInsets) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMES.backgroundColor[colorTheme],
  },
  difficultyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigationContainer: {
    marginTop: safeAreaInsets.top,
    marginHorizontal: 10,
    position: 'absolute'
  }
});

export default DifficultyScreen;