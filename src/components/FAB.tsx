import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FAB = ({ iconName, onPress, style = {} }: Props) => {
  return (
    <View style={{ ...styles.container, ...(style as any) }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={{ ...styles.button }}>
        <Icon
          name={iconName}
          color="white"
          size={35}
          style={{ ...styles.icon }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    zIndex: 999,
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4.65,
    elevation: 6,
  },
  icon: {
    left: 1.5,
  },
});
