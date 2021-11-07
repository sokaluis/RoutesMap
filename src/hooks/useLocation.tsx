import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>();
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const userWatchID = useRef<number>();

  useEffect(() => {
    getCurrentLocation().then(location => {
      setInitialPosition(location);
      setUserLocation(location);
      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) => {
          resolve({
            latitude,
            longitude,
          });
        },
        err => reject(err),
        {
          enableHighAccuracy: false,
          timeout: 2000,
          maximumAge: 3600000,
        },
      );
    });
  };

  const followUserLocation = () => {
    userWatchID.current = Geolocation.watchPosition(
      ({ coords: { longitude, latitude } }) => {
        setUserLocation({
          latitude,
          longitude,
        });
      },
      err => console.error(err),
      {
        enableHighAccuracy: false,
        distanceFilter: 10,
        timeout: 2000,
        maximumAge: 3600000,
      },
    );
  };

  const stopFollowUserLocation = () => {
    if (userWatchID.current) {
      Geolocation.clearWatch(userWatchID.current!);
    }
  };
  return {
    initialPosition,
    hasLocation,
    getCurrentLocation,
    userLocation,
    followUserLocation,
    stopFollowUserLocation,
  };
};

export default useLocation;
