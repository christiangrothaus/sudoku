import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';

type IconButtonProps = {
  onPress: Function,
  name: string,
  size?: number,
  style?: StyleProp<ViewStyle>
}

const IconButton = ({ onPress, name, size = 30, style }: IconButtonProps) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <Pressable style={style} onPress={(event) => onPress(event)}>
      <Icon name={name} size={size} color={styles.icon.color}></Icon>
    </Pressable>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  icon: {
    color: THEMES.color[colorTheme]
  }
});

export default IconButton;