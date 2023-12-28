import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Difficulty } from '../types/difficulties';
import DifficultyButton from '../components/DifficultyButton';
import DARK_THEME from '../themes/dark';

const DifficultyScreen = ({ navigation }) => {
  const handleBack = useCallback(() => navigation.navigate('Home'), []);

  const navigateToBoard = useCallback((difficulty: Difficulty) => {
    navigation.navigate('Board', { difficulty });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <Ionicons
          name="arrow-back"
          size={50}
          color={DARK_THEME.color}
          onPress={handleBack}
        />
      </View>
      <View style={styles.difficultyContainer}>
        <DifficultyButton difficulty={Difficulty.Easy} onPress={navigateToBoard}/>
        <DifficultyButton difficulty={Difficulty.Medium} onPress={navigateToBoard}/>
        <DifficultyButton difficulty={Difficulty.Hard} onPress={navigateToBoard}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.backgroundColor,
  },
  difficultyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigationContainer: {
    marginTop: 15,
    marginHorizontal: 10,
    position: 'absolute'
  },
  difficulty: {
    fontSize: 50,
    color: DARK_THEME.color,
    fontWeight: 'bold',
    marginVertical: 30
  }
});

export default DifficultyScreen;