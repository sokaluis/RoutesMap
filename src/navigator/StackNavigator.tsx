import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import LoadingScreen from '../screens/LoadingScreen';

type RootStackParams = {
  HomeScreen: undefined;
  PermissionsScreen: undefined;
  LoadingScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    </Stack.Navigator>
  );
}
