import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Maps } from '../components/Maps';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Maps />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
