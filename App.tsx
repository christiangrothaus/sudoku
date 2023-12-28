import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import DifficultyScreen from './src/screens/DifficultyScreen';
import BoardScreen from './src/screens/BoardScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Difficulty" component={DifficultyScreen}/>
        <Stack.Screen name="Board" component={BoardScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;