import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../models/themes';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';

type Props = {
  children: ReactNode,
  visible: boolean
}

const ConfirmationModal = ({ children, visible }: Props) => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        {children}
      </View>
    </View>
  );
};

const styleSheet = (colorTheme: Theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEMES.backgroundColor[colorTheme] + 'aa',
  },
  modal: {
    borderRadius: 5,
    backgroundColor: THEMES.backgroundColor[colorTheme],
    color: THEMES.color[colorTheme],
    borderColor: THEMES.accentColor[colorTheme],
    borderWidth: 1,
    padding: 20,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  }
});

export default ConfirmationModal;