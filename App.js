import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import Register from './src/screens/Register'

export default function App() {

  const Stack = createDrawerNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home " component={()=> <Home/>}></Stack.Screen>
        <Stack.Screen name = "Register " component={()=> <Register/>}></Stack.Screen>
        <Stack.Screen name = "Login " component={()=> <Login/>}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
