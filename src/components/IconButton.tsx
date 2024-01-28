import React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';

type PropsModel = {
  name: string,
  onPress?: (e: GestureResponderEvent) => void,
  size?: number,
  style?: StyleProp<ViewStyle>
}

const IconButton = ({ name, size = 30, style, onPress }: PropsModel) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <Pressable style={style} onPress={onPress}>
      <Icon name={name} size={size} color={styles.icon.color} />
    </Pressable>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  icon: {
    color: THEMES.color[colorTheme]
  }
});

export default IconButton;