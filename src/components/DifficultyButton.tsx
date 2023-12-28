import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Difficulty } from '../types/difficulties';

type DifficultyButtonProps = {
  difficulty: Difficulty,
  onPress: Function
}

const DifficultyButton = (props) => {
  const { difficulty, onPress }: DifficultyButtonProps = props;

  return (
    <Pressable onPress={() => onPress(difficulty)}>
      <Text style={styles.difficulty}>{Difficulty[difficulty]}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  difficulty: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 30
  }
});

export default DifficultyButton;