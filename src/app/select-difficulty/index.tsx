import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Difficulty } from '../../models/difficulties';
import MenuLink from '../../components/MenuLink';
import THEMES from '../../themes';
import useTheme from '../../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconLink from '../../components/IconLink';

const DifficultyScreen = () => {
  const colorTheme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const styles = styleSheet(colorTheme, safeAreaInsets);

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <IconLink
          href="/"
          name="arrow-back"
        />
      </View>
      <View style={styles.difficultyContainer}>
        <MenuLink text={Difficulty[Difficulty.Easy]} href={{ pathname: '/board', params: { difficulty: Difficulty.Easy } }} />
        <MenuLink text={Difficulty[Difficulty.Medium]} href={{ pathname: '/board', params: { difficulty: Difficulty.Hard } }} />
        <MenuLink text={Difficulty[Difficulty.Hard]} href={{ pathname: '/board', params: { difficulty: Difficulty.Hard } }} />
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