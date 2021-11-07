/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MarkerProps,
} from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import { FAB } from './FAB';

interface Props {
  markers?: MarkerProps[];
}

export const Maps = ({ markers }: Props) => {
  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const followingRef = useRef<boolean>(true);

  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();

    followingRef.current = true;

    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };

  useEffect(() => {
    followUserLocation();

    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!followingRef.current) {
      return;
    }
    const { latitude, longitude } = userLocation;
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  }, [userLocation]);

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={e => (mapViewRef.current = e!)}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation
        region={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onTouchStart={() => (followingRef.current = false)}>
        {markers?.map((item, index) => (
          <Marker
            key={index}
            image={require('../assets/custom-marker.png')}
            coordinate={item.coordinate}
            title={item.title}
            description={item.description}
          />
        ))}
      </MapView>
      <FAB
        iconName="compass-outline"
        onPress={centerPosition}
        style={{ ...styles.fab }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
