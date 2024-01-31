import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: ReactNode,
  style?: ViewStyle
}

const Row = ({ children, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default Row;