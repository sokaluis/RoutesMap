/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Location>();
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const userWatchID = useRef<number>();
  const isMouted = useRef(true);

  useEffect(() => {
    return () => {
      isMouted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation().then(location => {
      if (!isMouted.current) {
        return;
      }
      setInitialPosition(location);
      setUserLocation(location);
      setRouteLines(routes => [...routes, location]);
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
        if (!isMouted.current) {
          return;
        }
        const location: Location = {
          latitude,
          longitude,
        };
        setUserLocation({
          latitude,
          longitude,
        });
        setRouteLines(routes => [...routes, location]);
      },
      err => console.error(err),
      {
        enableHighAccuracy: false,
        distanceFilter: 1,
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
    routeLines,
  };
};

export default useLocation;
