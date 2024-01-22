import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import DifficultyScreen from './src/screens/DifficultyScreen';
import BoardScreen from './src/screens/BoardScreen';
import { useColorScheme } from 'react-native';
import ThemeContext from './src/contexts/ThemeContext';
import { Screen } from './src/models/screens';

const Stack = createStackNavigator();

const App = () => {
  const colorScheme = useColorScheme() || 'dark';

  return (
    <ThemeContext.Provider value={colorScheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          presentation: 'transparentModal'
        }}>
          <Stack.Screen name={Screen.HOME} component={HomeScreen}/>
          <Stack.Screen name={Screen.DIFFICULTY} component={DifficultyScreen}/>
          <Stack.Screen name={Screen.BOARD} component={BoardScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;