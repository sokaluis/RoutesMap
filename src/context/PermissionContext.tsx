/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  openSettings,
} from 'react-native-permissions';

export interface PermissionState {
  locationStatus: PermissionStatus;
}

interface ThemeProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const permissionInitState: PermissionState = {
  locationStatus: 'unavailable',
};

type PermissionContextProps = {
  permissions: PermissionState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionContext = createContext({} as PermissionContextProps);

export const PermissionProvider = ({ children }: ThemeProviderProps) => {
  const [permissions, setPermissions] =
    useState<PermissionState>(permissionInitState);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') {
        return;
      }
      checkLocationPermission();
    });
  }, []);

  const askLocationPermission = async () => {
    let permisionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permisionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permisionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    if (permisionStatus === 'blocked') {
      openSettings();
    }

    setPermissions({
      ...permissions,
      locationStatus: permisionStatus,
    });
  };
  const checkLocationPermission = async () => {
    let permisionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permisionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permisionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    setPermissions({
      ...permissions,
      locationStatus: permisionStatus,
    });
  };

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}>
      {children}
    </PermissionContext.Provider>
  );
};
