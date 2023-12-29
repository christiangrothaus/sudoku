import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';

type MenuButtonProps = {
  onPress: Function,
  children: string
}

const MenuButton = ({ onPress, children }: MenuButtonProps) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <Pressable onPress={(event) => onPress(event)}>
      <Text style={styles.button}>{children}</Text>
    </Pressable>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  button: {
    fontSize: 30,
    color: THEMES.color[colorTheme],
    fontWeight: 'bold',
    marginVertical: 30
  }
});

export default MenuButton;