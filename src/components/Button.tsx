import React, { ReactNode } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, ViewStyle, Text } from 'react-native';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';

type Props = {
  children: ReactNode,
  onPress: (e: GestureResponderEvent) => void,
  style?: ViewStyle
}

const Button = ({ children, style = {}, onPress }: Props) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>
        {children}
      </Text>
    </Pressable>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  container: {
    backgroundColor: THEMES.accentColor[colorTheme],
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    borderRadius: 5
  },
  text: {
    color: THEMES.color[colorTheme],
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default Button;