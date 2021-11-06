import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { PermissionContext } from '../context/PermissionContext';

type RootStackParams = {
  HomeScreen: undefined;
  PermissionsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export function StackNavigator() {
  const { permissions } = useContext(PermissionContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      ) : (
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
}
