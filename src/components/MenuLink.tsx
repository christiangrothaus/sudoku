import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';
import { Link } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';

type PropsModel = {
  text: string
}

const MenuLink = ({ href, replace, push, asChild, text }: LinkProps & PropsModel) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  return (
    <View style={styles.container}>
      <Link href={href} replace={replace} push={push} asChild={asChild}>
        <Text style={styles.button}>
          {text}
        </Text>
      </Link>
    </View>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  button: {
    fontSize: 30,
    color: THEMES.color[colorTheme],
    fontWeight: 'bold',
  },
  container: {
    marginVertical: 30
  }
});

export default MenuLink;