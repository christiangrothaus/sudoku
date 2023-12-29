import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import DifficultyScreen from './src/screens/DifficultyScreen';
import BoardScreen from './src/screens/BoardScreen';
import { useColorScheme } from 'react-native';
import ThemeContext from './src/contexts/ThemeContext';

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
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Difficulty" component={DifficultyScreen}/>
          <Stack.Screen name="Board" component={BoardScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;