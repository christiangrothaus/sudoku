import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import DARK_THEME from '../themes/dark';
import { Difficulty } from '../types/difficulties';

const BoardScreen = ({ navigation, route }) => {
  const { difficulty }: {difficulty: Difficulty} = route.params;

  const handleHome = useCallback(() => navigation.navigate('Home'), []);

  return (
    <View style={styles.container}>
      <Entypo onPress={handleHome} name="home" size={24} color={DARK_THEME.color} />
      <Text>BoardScreen</Text>
      <Text>{Difficulty[difficulty]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BoardScreen;