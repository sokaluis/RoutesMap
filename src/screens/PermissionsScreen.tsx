import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlackButton } from '../components/BlackButton';
import { PermissionContext } from '../context/PermissionContext';

const PermissionsScreen = () => {
  const { permissions, askLocationPermission } = useContext(PermissionContext);

  return (
    <View style={styles.container}>
      <Text>Solicitar Permisos de Location</Text>

      <BlackButton title="Permiso" onPress={askLocationPermission} />

      <Text>{JSON.stringify(permissions, null, 3)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PermissionsScreen;
