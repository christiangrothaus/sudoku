import React, { useCallback } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {

  const handleStart = useCallback(() => navigation.navigate('Difficulty'), []);

  return (
    <View style={styles.container}>
      <Button title="Start" onPress={handleStart}/>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;