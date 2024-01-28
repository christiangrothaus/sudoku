import React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';
import { Link } from 'expo-router';

type PropsModel = {
  name: string,
  onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void,
  size?: number,
  style?: StyleProp<ViewStyle>,
  href?: string,
  replace?: boolean,
  push?: boolean,
  asChild?: boolean
}

const IconLink = ({ name, size = 30, style, href, replace, push, asChild, onPress }: PropsModel) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <View style={style}>
      <Link href={href} replace={replace} push={push} asChild={asChild} onPress={onPress}>
        <Icon name={name} size={size} color={styles.icon.color} />
      </Link>
    </View>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  icon: {
    color: THEMES.color[colorTheme]
  }
});

export default IconLink;