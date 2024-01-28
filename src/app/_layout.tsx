import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import { Slot } from 'expo-router';

const App = () => {
  const colorScheme = useColorScheme() || 'dark';

  return (
    <ThemeContext.Provider value={colorScheme}>
      <Slot />
    </ThemeContext.Provider>
  );
};

export default App;